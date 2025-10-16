/**
 * Meta Webhooks Integration Tests
 *
 * Tests webhook handling for Meta (Facebook) Ads:
 * - Webhook verification
 * - Campaign change events
 * - Ad set change events
 * - Ad change events
 * - Budget changes
 * - Status changes
 * - Signature validation
 * - Event processing
 */

import { GET as webhookVerifyGET, POST as webhookPOST } from '@/app/api/webhooks/meta/route'
import { createMockRequest, mockAdAccount, mockOrganization } from '../utils/test-helpers'

// Mock crypto for signature validation
global.crypto = {
  subtle: {
    importKey: jest.fn(),
    sign: jest.fn(),
  },
} as any

// Mock database
const mockDb = {
  query: {
    adAccount: {
      findFirst: jest.fn(() => Promise.resolve(mockAdAccount)),
    },
  },
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => Promise.resolve([{ id: 'event_new123' }])),
    })),
  })),
}

jest.mock('@/lib/db/client', () => ({
  db: mockDb,
}))

// Mock change detection
jest.mock('@/lib/change-detection/detect-changes', () => ({
  detectChanges: jest.fn(() => ({
    hasChanges: true,
    changes: {
      status: { before: 'PAUSED', after: 'ACTIVE' },
    },
  })),
}))

// Mock notification triggering
const mockTriggerNotifications = jest.fn()
jest.mock('@/lib/notifications/trigger', () => ({
  triggerNotifications: mockTriggerNotifications,
}))

describe('Meta Webhooks Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.META_WEBHOOK_VERIFY_TOKEN = 'test_verify_token'
    process.env.META_APP_SECRET = 'test_app_secret'
  })

  describe('Webhook Verification', () => {
    it('should verify webhook with correct token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=test_verify_token&hub.challenge=test_challenge',
      })

      const response = await webhookVerifyGET(request)

      expect(response.status).toBe(200)
      const body = await response.text()
      expect(body).toBe('test_challenge')
    })

    it('should reject verification with incorrect token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=test_challenge',
      })

      const response = await webhookVerifyGET(request)

      expect(response.status).toBe(403)
    })

    it('should reject verification without token', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/webhooks/meta?hub.mode=subscribe&hub.challenge=test_challenge',
      })

      const response = await webhookVerifyGET(request)

      expect(response.status).toBe(403)
    })

    it('should reject verification without challenge', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/webhooks/meta?hub.mode=subscribe&hub.verify_token=test_verify_token',
      })

      const response = await webhookVerifyGET(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Campaign Change Events', () => {
    const mockCampaignEvent = {
      entry: [
        {
          id: 'act_123456',
          time: 1234567890,
          changes: [
            {
              value: {
                verb: 'update',
                object_type: 'campaign',
                object_id: 'camp_123',
                field: 'status',
                before: 'PAUSED',
                after: 'ACTIVE',
              },
            },
          ],
        },
      ],
    }

    it('should process campaign status change event', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: mockCampaignEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
      expect(mockDb.insert).toHaveBeenCalled()
      expect(mockTriggerNotifications).toHaveBeenCalled()
    })

    it('should detect campaign budget changes', async () => {
      const budgetChangeEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                  field: 'daily_budget',
                  before: '10000',
                  after: '20000',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: budgetChangeEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
      expect(mockDb.insert).toHaveBeenCalled()
    })

    it('should detect campaign creation', async () => {
      const createEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'add',
                  object_type: 'campaign',
                  object_id: 'camp_new',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: createEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })

    it('should detect campaign deletion', async () => {
      const deleteEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'remove',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: deleteEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Ad Set Change Events', () => {
    it('should process ad set status change', async () => {
      const adSetEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'adset',
                  object_id: 'adset_123',
                  field: 'status',
                  before: 'ACTIVE',
                  after: 'PAUSED',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: adSetEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
      expect(mockDb.insert).toHaveBeenCalled()
    })

    it('should detect ad set bid changes', async () => {
      const bidChangeEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'adset',
                  object_id: 'adset_123',
                  field: 'bid_amount',
                  before: '500',
                  after: '750',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: bidChangeEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })

    it('should detect targeting changes', async () => {
      const targetingEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'adset',
                  object_id: 'adset_123',
                  field: 'targeting',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: targetingEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Ad Change Events', () => {
    it('should process ad creative changes', async () => {
      const adEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'ad',
                  object_id: 'ad_123',
                  field: 'creative',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: adEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })

    it('should detect ad status changes', async () => {
      const statusEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'ad',
                  object_id: 'ad_123',
                  field: 'status',
                  before: 'ACTIVE',
                  after: 'DISAPPROVED',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: statusEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Batch Events', () => {
    it('should process multiple changes in one webhook', async () => {
      const batchEvent = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_1',
                  field: 'status',
                },
              },
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_2',
                  field: 'budget',
                },
              },
              {
                value: {
                  verb: 'update',
                  object_type: 'adset',
                  object_id: 'adset_1',
                  field: 'bid_amount',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: batchEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
      // Should process all 3 changes
      expect(mockDb.insert).toHaveBeenCalledTimes(3)
    })

    it('should process events from multiple ad accounts', async () => {
      const multiAccountEvent = {
        entry: [
          {
            id: 'act_111',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_1',
                },
              },
            ],
          },
          {
            id: 'act_222',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_2',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: multiAccountEvent,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Error Handling', () => {
    it('should handle unknown ad account gracefully', async () => {
      mockDb.query.adAccount.findFirst.mockResolvedValueOnce(null)

      const event = {
        entry: [
          {
            id: 'act_unknown',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      // Should still return 200 to acknowledge receipt
      expect(response.status).toBe(200)
      // But should not insert event
      expect(mockDb.insert).not.toHaveBeenCalled()
    })

    it('should handle malformed webhook payload', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: 'invalid json',
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(400)
    })

    it('should handle missing signature', async () => {
      const event = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        // No signature header
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(401)
    })

    it('should handle database errors gracefully', async () => {
      mockDb.insert.mockRejectedValueOnce(new Error('Database error'))

      const event = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      // Should still return 200 to prevent retries
      expect(response.status).toBe(200)
    })

    it('should handle empty changes array', async () => {
      const event = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      const response = await webhookPOST(request)

      expect(response.status).toBe(200)
      expect(mockDb.insert).not.toHaveBeenCalled()
    })
  })

  describe('Notification Triggering', () => {
    it('should trigger notifications after processing event', async () => {
      const event = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                  field: 'status',
                  before: 'PAUSED',
                  after: 'ACTIVE',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      await webhookPOST(request)

      expect(mockTriggerNotifications).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: mockAdAccount.organizationId,
          platform: 'meta',
          changeType: expect.any(String),
        })
      )
    })

    it('should not trigger notifications if no changes detected', async () => {
      const { detectChanges } = require('@/lib/change-detection/detect-changes')
      detectChanges.mockReturnValueOnce({ hasChanges: false, changes: {} })

      const event = {
        entry: [
          {
            id: 'act_123456',
            time: 1234567890,
            changes: [
              {
                value: {
                  verb: 'update',
                  object_type: 'campaign',
                  object_id: 'camp_123',
                },
              },
            ],
          },
        ],
      }

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/webhooks/meta',
        body: event,
        headers: {
          'x-hub-signature-256': 'sha256=test_signature',
        },
      })

      await webhookPOST(request)

      expect(mockTriggerNotifications).not.toHaveBeenCalled()
    })
  })
})
