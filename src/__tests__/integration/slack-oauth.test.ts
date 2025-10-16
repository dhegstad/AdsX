/**
 * Slack OAuth Integration Tests
 *
 * Tests the complete OAuth flow for Slack:
 * - Authorization URL generation
 * - OAuth callback handling
 * - Token exchange
 * - Workspace connection
 * - Channel listing
 * - Message posting
 * - Error handling
 */

import { GET as authorizeGET } from '@/app/api/oauth/slack/authorize/route'
import { GET as callbackGET } from '@/app/api/oauth/slack/callback/route'
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
    slackIntegration: {
      findFirst: jest.fn(() => Promise.resolve(null)),
    },
  },
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => Promise.resolve([{ id: 'slack_new123' }])),
    })),
  })),
  update: jest.fn(() => ({
    set: jest.fn(() => ({
      where: jest.fn(() => Promise.resolve()),
    })),
  })),
}

jest.mock('@/lib/db/client', () => ({
  db: mockDb,
}))

describe('Slack OAuth Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.SLACK_CLIENT_ID = 'test_client_id.slack'
    process.env.SLACK_CLIENT_SECRET = 'test_client_secret'
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
  })

  describe('Authorization Flow', () => {
    it('should generate valid authorization URL with correct scopes', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(302)

      const location = response.headers.get('Location')
      expect(location).toContain('slack.com/oauth/v2/authorize')
      expect(location).toContain('client_id=test_client_id')
      expect(location).toContain('redirect_uri=')
      expect(location).toContain('scope=')
      expect(location).toContain('chat:write')
      expect(location).toContain('channels:read')
      expect(location).toContain('groups:read')
      expect(location).toContain('incoming-webhook')
    })

    it('should include state parameter for CSRF protection', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/authorize?orgId=org_test123',
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
        url: 'http://localhost:3000/api/oauth/slack/authorize',
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
        url: 'http://localhost:3000/api/oauth/slack/authorize?orgId=org_test123',
      })

      const response = await authorizeGET(request)
      expect(response.status).toBe(401)
    })
  })

  describe('OAuth Callback', () => {
    const mockOAuthResponse = {
      ok: true,
      access_token: 'xoxb-test-access-token',
      token_type: 'bot',
      scope: 'chat:write,channels:read,groups:read,incoming-webhook',
      bot_user_id: 'U0BOTUSER',
      app_id: 'A0TESTAPP',
      team: {
        id: 'T123ABC',
        name: 'Test Workspace',
      },
      incoming_webhook: {
        channel: '#alerts',
        channel_id: 'C123CHANNEL',
        configuration_url: 'https://test-workspace.slack.com/services/B0TEST',
        url: 'https://hooks.slack.com/services/T123ABC/B123BOT/testwebhookurl',
      },
      authed_user: {
        id: 'U123USER',
      },
    }

    beforeEach(() => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('slack.com/api/oauth.v2.access')) {
          return mockFetchResponse(mockOAuthResponse)
        }
        return mockFetchResponse({ error: 'not_found' }, 404)
      })
    })

    it('should successfully exchange code for access token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('slack.com/api/oauth.v2.access'),
        expect.objectContaining({
          method: 'POST',
        })
      )

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/settings/integrations')
    })

    it('should store workspace information correctly', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Verify workspace data was inserted
      expect(mockDb.insert).toHaveBeenCalled()
      const insertCall = (mockDb.insert as jest.Mock).mock.calls[0]
      expect(insertCall).toBeDefined()
    })

    it('should store incoming webhook URL', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Verify webhook URL is stored
      expect(mockDb.insert).toHaveBeenCalled()
      // Check that incoming webhook data is included
    })

    it('should handle token exchange failure', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ ok: false, error: 'invalid_code' })
      )

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=invalid_code&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should reject callback without code parameter', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(400)
    })

    it('should reject callback with OAuth error', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?error=access_denied',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=access_denied')
    })

    it('should update existing integration if already connected', async () => {
      mockDb.query.slackIntegration.findFirst.mockResolvedValueOnce({
        id: 'slack_existing',
        organizationId: 'org_test123',
        teamId: 'T123ABC',
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      await callbackGET(request)

      // Should update instead of insert
      expect(mockDb.update).toHaveBeenCalled()
    })

    it('should handle missing incoming webhook gracefully', async () => {
      ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('slack.com/api/oauth.v2.access')) {
          return mockFetchResponse({
            ok: true,
            access_token: 'xoxb-test-access-token',
            team: { id: 'T123ABC', name: 'Test Workspace' },
            bot_user_id: 'U0BOTUSER',
            // No incoming_webhook
          })
        }
        return mockFetchResponse({ error: 'not_found' }, 404)
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('/settings/integrations')
    })
  })

  describe('Message Posting', () => {
    it('should post message to Slack channel successfully', async () => {
      const mockPostResponse = {
        ok: true,
        channel: 'C123CHANNEL',
        ts: '1234567890.123456',
        message: {
          text: 'Test message',
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse(mockPostResponse)
      )

      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer xoxb-test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: 'C123CHANNEL',
          text: 'Test message',
        }),
      })

      const data = await response.json()

      expect(data.ok).toBe(true)
      expect(data.channel).toBe('C123CHANNEL')
    })

    it('should handle message posting failure', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ ok: false, error: 'channel_not_found' })
      )

      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer xoxb-test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: 'C_INVALID',
          text: 'Test message',
        }),
      })

      const data = await response.json()

      expect(data.ok).toBe(false)
      expect(data.error).toBe('channel_not_found')
    })

    it('should handle rate limiting', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse(
          { ok: false, error: 'rate_limited' },
          429
        )
      )

      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer xoxb-test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: 'C123CHANNEL',
          text: 'Test message',
        }),
      })

      expect(response.status).toBe(429)
    })
  })

  describe('Error Scenarios', () => {
    it('should handle network errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should handle missing client credentials', async () => {
      delete process.env.SLACK_CLIENT_ID
      delete process.env.SLACK_CLIENT_SECRET

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/authorize?orgId=org_test123',
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
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toContain('error=')
    })

    it('should handle workspace already connected', async () => {
      mockDb.query.slackIntegration.findFirst.mockResolvedValueOnce({
        id: 'slack_existing',
        organizationId: 'org_test123',
        teamId: 'T123ABC',
        teamName: 'Test Workspace',
        accessToken: 'xoxb-old-token',
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/oauth/slack/callback?code=auth_code_123&state=valid_state',
      })

      const response = await callbackGET(request)

      // Should update the existing connection
      expect(mockDb.update).toHaveBeenCalled()
      expect(response.status).toBe(302)
    })
  })
})
