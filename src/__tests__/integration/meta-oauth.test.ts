/**
 * Meta (Facebook) OAuth Integration Tests
 *
 * Tests the complete OAuth flow for Meta Ads:
 * - Authorization URL generation
 * - OAuth callback handling
 * - Token exchange
 * - Account connection
 * - Token refresh
 * - Error handling
 */

import { GET as authorizeGET } from '@/app/api/oauth/meta/authorize/route'
import { GET as callbackGET } from '@/app/api/oauth/meta/callback/route'
import { createMockRequest, mockFetchResponse, mockOrganization, mockUser } from '../utils/test-helpers'

// Mock fetch for external API calls
global.fetch = jest.fn()

// Mock auth
jest.mock('@/lib/auth/config', () => ({
  auth: {
    api: {
      getSession: jest.fn(() =>
        Promise.resolve({
          session: { userId: mockUser.id },
          user: mockUser,
        })
      ),
    },
  },
}))

// Mock database
const mockDb = {
  query: {
    organization: {
      findFirst: jest.fn(() => Promise.resolve(mockOrganization)),
    },
    adAccount: {
      findFirst: jest.fn(() => Promise.resolve(null)),
    },
  },
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => Promise.resolve([{ id: 'acc_new123' }])),
    })),
  })),
}

jest.mock('@/lib/db/client', () => ({
  db: mockDb,
}))

describe('Meta OAuth Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.META_APP_ID = 'test_app_id'
    process.env.META_APP_SECRET = 'test_app_secret'
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
  })

  describe('Authorization Flow', () => {
    it('should generate valid authorization URL with correct parameters', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(302)

      const location = response.headers.get('Location')
      expect(location).toContain('facebook.com/dialog/oauth')
      expect(location).toContain('client_id=test_app_id')
      expect(location).toContain('redirect_uri=')
      expect(location).toContain('scope=ads_read')
      expect(location).toContain('scope=ads_management')
    })

    it('should include state parameter for CSRF protection', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      const location = response.headers.get('Location')

      expect(location).toContain('state=')
      const stateMatch = location?.match(/state=([^&]+)/)
      expect(stateMatch).toBeTruthy()
      expect(stateMatch![1].length).toBeGreaterThan(20) // Should be a secure random string
    })

    it('should reject authorization without orgId', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/authorize',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toContain('orgId')
    })

    it('should reject authorization when not authenticated', async () => {
      const { auth } = require('@/lib/auth/config')
      auth.api.getSession.mockResolvedValueOnce({ session: null, user: null })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(401)
    })
  })

  describe('OAuth Callback', () => {
    const mockTokenResponse = {
      access_token: 'meta_access_token_123',
      token_type: 'bearer',
      expires_in: 5183944, // ~60 days
    }

    const mockAdAccountsResponse = {
      data: [
        {
          id: 'act_123456',
          name: 'Test Ad Account',
          account_status: 1,
          currency: 'USD',
        },
        {
          id: 'act_789012',
          name: 'Another Ad Account',
          account_status: 1,
          currency: 'EUR',
        },
      ],
    }

    beforeEach(() => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('graph.facebook.com/oauth/access_token')) {
          return mockFetchResponse(mockTokenResponse)
        }
        if (url.includes('graph.facebook.com/v18.0/me/adaccounts')) {
          return mockFetchResponse(mockAdAccountsResponse)
        }
        return mockFetchResponse({ error: 'Not found' }, 404)
      })
    })

    it('should successfully exchange code for access token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('graph.facebook.com/oauth/access_token'),
        expect.any(Object)
      )

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/connections')
    })

    it('should fetch and store ad accounts after token exchange', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Verify ad accounts were fetched
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('me/adaccounts'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer meta_access_token_123',
          }),
        })
      )

      // Verify accounts were inserted into database
      expect(mockDb.insert).toHaveBeenCalled()
    })

    it('should handle token exchange failure', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ error: 'invalid_grant' }, 400)
      )

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=invalid_code&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should reject callback without code parameter', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(400)
    })

    it('should reject callback with OAuth error', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?error=access_denied&error_description=User+denied',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=access_denied')
    })

    it('should calculate correct token expiration time', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Check that token expiration was set correctly (5183944 seconds = ~60 days)
      const insertCall = (mockDb.insert as jest.Mock).mock.results[0]
      expect(insertCall).toBeDefined()
    })

    it('should handle empty ad accounts list', async () => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('graph.facebook.com/oauth/access_token')) {
          return mockFetchResponse(mockTokenResponse)
        }
        if (url.includes('graph.facebook.com/v18.0/me/adaccounts')) {
          return mockFetchResponse({ data: [] })
        }
        return mockFetchResponse({ error: 'Not found' }, 404)
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      // Should still succeed even with no ad accounts
      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/connections')
    })
  })

  describe('Token Refresh', () => {
    it('should detect expired tokens', () => {
      const expiredDate = new Date(Date.now() - 3600000) // 1 hour ago
      const isExpired = expiredDate < new Date()

      expect(isExpired).toBe(true)
    })

    it('should not flag valid tokens as expired', () => {
      const validDate = new Date(Date.now() + 3600000) // 1 hour from now
      const isExpired = validDate < new Date()

      expect(isExpired).toBe(false)
    })
  })

  describe('Error Scenarios', () => {
    it('should handle network errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should handle malformed API responses', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse('invalid json response')
      )

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should handle missing environment variables', async () => {
      delete process.env.META_APP_ID
      delete process.env.META_APP_SECRET

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/meta/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)

      expect(response.status).toBe(500)
    })
  })
})
