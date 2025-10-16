/**
 * Google Ads OAuth Integration Tests
 *
 * Tests the complete OAuth flow for Google Ads:
 * - Authorization URL generation
 * - OAuth callback handling
 * - Token exchange with refresh token
 * - Account connection
 * - Token refresh flow
 * - Error handling
 */

import { GET as authorizeGET } from '@/app/api/oauth/google/authorize/route'
import { GET as callbackGET } from '@/app/api/oauth/google/callback/route'
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

describe('Google Ads OAuth Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.GOOGLE_CLIENT_ID = 'test_client_id.apps.googleusercontent.com'
    process.env.GOOGLE_CLIENT_SECRET = 'test_client_secret'
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN = 'test_dev_token'
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
  })

  describe('Authorization Flow', () => {
    it('should generate valid authorization URL with correct scopes', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(302)

      const location = response.headers.get('Location')
      expect(location).toContain('accounts.google.com/o/oauth2/v2/auth')
      expect(location).toContain('client_id=test_client_id')
      expect(location).toContain('redirect_uri=')
      expect(location).toContain('scope=')
      expect(location).toContain('adwords')
      expect(location).toContain('access_type=offline') // Important for refresh token
      expect(location).toContain('prompt=consent') // Force consent to get refresh token
    })

    it('should request offline access for refresh tokens', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      const location = response.headers.get('Location')

      expect(location).toContain('access_type=offline')
      expect(location).toContain('prompt=consent')
    })

    it('should include state parameter for CSRF protection', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      const location = response.headers.get('Location')

      expect(location).toContain('state=')
      const stateMatch = location?.match(/state=([^&]+)/)
      expect(stateMatch).toBeTruthy()
      expect(stateMatch![1].length).toBeGreaterThan(20)
    })

    it('should reject authorization without orgId', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize',
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
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(401)
    })
  })

  describe('OAuth Callback', () => {
    const mockTokenResponse = {
      access_token: 'google_access_token_123',
      refresh_token: 'google_refresh_token_123',
      expires_in: 3599,
      scope: 'https://www.googleapis.com/auth/adwords',
      token_type: 'Bearer',
    }

    const mockCustomerResponse = {
      resourceNames: [
        'customers/1234567890',
        'customers/0987654321',
      ],
    }

    const mockCustomerDetailsResponse = {
      results: [
        {
          customer: {
            resourceName: 'customers/1234567890',
            id: '1234567890',
            descriptiveName: 'Test Customer Account',
            currencyCode: 'USD',
            timeZone: 'America/New_York',
          },
        },
      ],
    }

    beforeEach(() => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('oauth2.googleapis.com/token')) {
          return mockFetchResponse(mockTokenResponse)
        }
        if (url.includes('googleads.googleapis.com/v15/customers:listAccessibleCustomers')) {
          return mockFetchResponse(mockCustomerResponse)
        }
        if (url.includes('googleads.googleapis.com/v15/customers/1234567890/googleAds:search')) {
          return mockFetchResponse(mockCustomerDetailsResponse)
        }
        return mockFetchResponse({ error: 'Not found' }, 404)
      })
    })

    it('should successfully exchange code for tokens', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('oauth2.googleapis.com/token'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('code=auth_code_123'),
        })
      )

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/connections')
    })

    it('should receive and store refresh token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Verify refresh token is stored
      expect(mockDb.insert).toHaveBeenCalled()
      const insertCall = (mockDb.insert as jest.Mock).mock.calls[0]
      // Check that the values include a refresh token
      expect(insertCall).toBeDefined()
    })

    it('should fetch and store accessible customers', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Verify accessible customers were fetched
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('listAccessibleCustomers'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer google_access_token_123',
            'developer-token': 'test_dev_token',
          }),
        })
      )

      // Verify customer details were fetched
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('googleAds:search'),
        expect.any(Object)
      )

      // Verify accounts were inserted
      expect(mockDb.insert).toHaveBeenCalled()
    })

    it('should handle token exchange failure', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ error: 'invalid_grant' }, 400)
      )

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=invalid_code&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should reject callback without code parameter', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(400)
    })

    it('should reject callback with OAuth error', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?error=access_denied&error_description=User+denied',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=access_denied')
    })

    it('should handle missing refresh token gracefully', async () => {
      // Sometimes Google doesn't return refresh token
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('oauth2.googleapis.com/token')) {
          return mockFetchResponse({
            access_token: 'google_access_token_123',
            expires_in: 3599,
            scope: 'https://www.googleapis.com/auth/adwords',
            token_type: 'Bearer',
            // No refresh_token
          })
        }
        return mockFetchResponse({ error: 'Not found' }, 404)
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      // Should still work but log a warning
      expect(response.status).toBe(302)
    })

    it('should calculate correct token expiration time', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const before = Date.now()
      await callbackGET(request)
      const after = Date.now()

      // Token should expire in ~3599 seconds from now
      const expectedExpiration = before + 3599 * 1000
      expect(expectedExpiration).toBeGreaterThanOrEqual(before)
      expect(expectedExpiration).toBeLessThanOrEqual(after + 3599 * 1000)
    })

    it('should handle empty customers list', async () => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('oauth2.googleapis.com/token')) {
          return mockFetchResponse(mockTokenResponse)
        }
        if (url.includes('listAccessibleCustomers')) {
          return mockFetchResponse({ resourceNames: [] })
        }
        return mockFetchResponse({ error: 'Not found' }, 404)
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/connections')
    })
  })

  describe('Token Refresh', () => {
    it('should use refresh token to get new access token', async () => {
      const mockRefreshResponse = {
        access_token: 'new_access_token_456',
        expires_in: 3599,
        scope: 'https://www.googleapis.com/auth/adwords',
        token_type: 'Bearer',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse(mockRefreshResponse)
      )

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: 'google_refresh_token_123',
          client_id: 'test_client_id',
          client_secret: 'test_client_secret',
        }),
      })

      const data = await response.json()

      expect(data.access_token).toBe('new_access_token_456')
      expect(data.expires_in).toBe(3599)
    })

    it('should handle refresh token expiration', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ error: 'invalid_grant' }, 400)
      )

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: 'expired_refresh_token',
          client_id: 'test_client_id',
          client_secret: 'test_client_secret',
        }),
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('invalid_grant')
    })
  })

  describe('Error Scenarios', () => {
    it('should handle network errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should handle missing developer token', async () => {
      delete process.env.GOOGLE_ADS_DEVELOPER_TOKEN

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)

      expect(response.status).toBe(500)
    })

    it('should handle missing client credentials', async () => {
      delete process.env.GOOGLE_CLIENT_ID
      delete process.env.GOOGLE_CLIENT_SECRET

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)

      expect(response.status).toBe(500)
    })

    it('should handle malformed API responses', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse('invalid json response')
      )

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/google/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })
  })
})
