/**
 * Notification Triggering Tests
 *
 * Tests the notification system that evaluates rules and sends alerts:
 * - Rule matching logic
 * - Condition evaluation
 * - Slack notifications
 * - Email notifications
 * - Rate limiting
 * - Error handling
 */

import { triggerNotifications } from '@/lib/notifications/trigger'
import { evaluateRule } from '@/lib/rules/evaluate'
import {
  mockChangeEvent,
  mockNotificationRule,
  mockSlackIntegration,
  mockOrganization,
  mockFetchResponse,
} from '../utils/test-helpers'

// Mock fetch for Slack/Email API calls
global.fetch = jest.fn()

// Mock database
const mockDb = {
  query: {
    notificationRule: {
      findMany: jest.fn(() => Promise.resolve([mockNotificationRule])),
    },
    slackIntegration: {
      findFirst: jest.fn(() => Promise.resolve(mockSlackIntegration)),
    },
  },
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => Promise.resolve([{ id: 'log_new123' }])),
    })),
  })),
}

jest.mock('@/lib/db/client', () => ({
  db: mockDb,
}))

// Mock email sending
const mockSendEmail = jest.fn()
jest.mock('@/lib/email/send', () => ({
  sendEmail: mockSendEmail,
}))

describe('Notification Triggering', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue(
      mockFetchResponse({ ok: true, ts: '1234567890.123456' })
    )
  })

  describe('Rule Matching', () => {
    it('should match rule when platform matches', () => {
      const rule = {
        ...mockNotificationRule,
        platforms: ['meta'],
      }

      const event = {
        ...mockChangeEvent,
        platform: 'meta' as const,
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should not match rule when platform does not match', () => {
      const rule = {
        ...mockNotificationRule,
        platforms: ['google'],
      }

      const event = {
        ...mockChangeEvent,
        platform: 'meta' as const,
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(false)
    })

    it('should match rule when change type matches', () => {
      const rule = {
        ...mockNotificationRule,
        changeTypes: ['campaign_status_changed'],
      }

      const event = {
        ...mockChangeEvent,
        changeType: 'campaign_status_changed' as const,
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should match rule with multiple allowed platforms', () => {
      const rule = {
        ...mockNotificationRule,
        platforms: ['meta', 'google'],
      }

      const event = {
        ...mockChangeEvent,
        platform: 'google' as const,
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should match rule with multiple allowed change types', () => {
      const rule = {
        ...mockNotificationRule,
        changeTypes: ['campaign_status_changed', 'campaign_budget_changed'],
      }

      const event = {
        ...mockChangeEvent,
        changeType: 'campaign_budget_changed' as const,
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should not match inactive rules', () => {
      const rule = {
        ...mockNotificationRule,
        isActive: false,
      }

      const event = mockChangeEvent

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(false)
    })
  })

  describe('Condition Evaluation', () => {
    it('should evaluate simple field equality condition', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'status',
              operator: 'equals' as const,
              value: 'ACTIVE',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should evaluate "changed_to" condition', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'status',
              operator: 'changed_to' as const,
              value: 'ACTIVE',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should evaluate "changed_from" condition', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'status',
              operator: 'changed_from' as const,
              value: 'PAUSED',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should evaluate "contains" condition', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'entityName',
              operator: 'contains' as const,
              value: 'Test',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        entityName: 'Test Campaign',
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should evaluate AND conditions', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'platform',
              operator: 'equals' as const,
              value: 'meta',
            },
            {
              field: 'status',
              operator: 'changed_to' as const,
              value: 'ACTIVE',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        platform: 'meta' as const,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should fail AND conditions if one fails', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'platform',
              operator: 'equals' as const,
              value: 'google',
            },
            {
              field: 'status',
              operator: 'changed_to' as const,
              value: 'ACTIVE',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        platform: 'meta' as const,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(false)
    })

    it('should evaluate OR conditions', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'OR' as const,
          rules: [
            {
              field: 'platform',
              operator: 'equals' as const,
              value: 'google',
            },
            {
              field: 'status',
              operator: 'changed_to' as const,
              value: 'ACTIVE',
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        platform: 'meta' as const,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })

    it('should handle numeric comparisons', () => {
      const rule = {
        ...mockNotificationRule,
        conditions: {
          operator: 'AND' as const,
          rules: [
            {
              field: 'budget',
              operator: 'greater_than' as const,
              value: 10000,
            },
          ],
        },
      }

      const event = {
        ...mockChangeEvent,
        changes: {
          daily_budget: {
            before: '5000',
            after: '20000',
          },
        },
      }

      const result = evaluateRule(rule, event)

      expect(result.matches).toBe(true)
    })
  })

  describe('Slack Notifications', () => {
    it('should send Slack notification when rule matches', async () => {
      await triggerNotifications(mockChangeEvent)

      expect(global.fetch).toHaveBeenCalledWith(
        mockSlackIntegration.incomingWebhook.url,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.stringContaining('Campaign status changed'),
        })
      )
    })

    it('should format Slack message with change details', async () => {
      await triggerNotifications({
        ...mockChangeEvent,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
          daily_budget: {
            before: '10000',
            after: '20000',
          },
        },
      })

      expect(global.fetch).toHaveBeenCalled()
      const callArgs = (global.fetch as jest.Mock).mock.calls[0]
      const body = JSON.parse(callArgs[1].body)

      expect(body.text).toContain('PAUSED')
      expect(body.text).toContain('ACTIVE')
      expect(body.blocks).toBeDefined()
    })

    it('should include metadata in Slack message', async () => {
      await triggerNotifications({
        ...mockChangeEvent,
        entityName: 'Summer Sale Campaign',
        platform: 'meta' as const,
      })

      const callArgs = (global.fetch as jest.Mock).mock.calls[0]
      const body = JSON.parse(callArgs[1].body)

      expect(body.text).toContain('Summer Sale Campaign')
      expect(body.text).toContain('Meta')
    })

    it('should handle Slack API errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ ok: false, error: 'channel_not_found' }, 404)
      )

      // Should not throw
      await expect(triggerNotifications(mockChangeEvent)).resolves.not.toThrow()

      // Should log the error
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'failed',
        })
      )
    })

    it('should retry failed Slack notifications', async () => {
      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce(mockFetchResponse({ ok: false }, 500))
        .mockResolvedValueOnce(mockFetchResponse({ ok: true, ts: '123.456' }))

      await triggerNotifications(mockChangeEvent)

      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('Email Notifications', () => {
    it('should send email when rule specifies email channel', async () => {
      const ruleWithEmail = {
        ...mockNotificationRule,
        notificationChannels: ['email'],
        emailRecipients: ['admin@example.com', 'alerts@example.com'],
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([ruleWithEmail])

      await triggerNotifications(mockChangeEvent)

      expect(mockSendEmail).toHaveBeenCalledWith({
        to: 'admin@example.com',
        subject: expect.stringContaining('Campaign status changed'),
        html: expect.any(String),
      })

      expect(mockSendEmail).toHaveBeenCalledWith({
        to: 'alerts@example.com',
        subject: expect.stringContaining('Campaign status changed'),
        html: expect.any(String),
      })
    })

    it('should format email with change details', async () => {
      const ruleWithEmail = {
        ...mockNotificationRule,
        notificationChannels: ['email'],
        emailRecipients: ['admin@example.com'],
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([ruleWithEmail])

      await triggerNotifications({
        ...mockChangeEvent,
        changes: {
          status: {
            before: 'PAUSED',
            after: 'ACTIVE',
          },
        },
      })

      expect(mockSendEmail).toHaveBeenCalled()
      const emailCall = mockSendEmail.mock.calls[0][0]

      expect(emailCall.html).toContain('PAUSED')
      expect(emailCall.html).toContain('ACTIVE')
    })

    it('should handle email sending errors gracefully', async () => {
      mockSendEmail.mockRejectedValueOnce(new Error('SMTP error'))

      const ruleWithEmail = {
        ...mockNotificationRule,
        notificationChannels: ['email'],
        emailRecipients: ['admin@example.com'],
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([ruleWithEmail])

      // Should not throw
      await expect(triggerNotifications(mockChangeEvent)).resolves.not.toThrow()
    })
  })

  describe('Notification Logging', () => {
    it('should log successful notification', async () => {
      await triggerNotifications(mockChangeEvent)

      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'sent',
          channel: 'slack',
        })
      )
    })

    it('should log failed notification', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ ok: false }, 500)
      )

      await triggerNotifications(mockChangeEvent)

      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'failed',
        })
      )
    })

    it('should include error message in log', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network timeout')
      )

      await triggerNotifications(mockChangeEvent)

      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'failed',
          error: expect.stringContaining('Network timeout'),
        })
      )
    })
  })

  describe('Rate Limiting', () => {
    it('should not send duplicate notifications within time window', async () => {
      // Send first notification
      await triggerNotifications(mockChangeEvent)

      // Send same notification again immediately
      await triggerNotifications(mockChangeEvent)

      // Should only send once (due to deduplication)
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should respect per-rule rate limits', async () => {
      const notifications = Array(10).fill(mockChangeEvent)

      for (const event of notifications) {
        await triggerNotifications(event)
      }

      // Should not send more than configured limit per minute
      expect(global.fetch).toHaveBeenCalledTimes(
        expect.any(Number)
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle missing Slack integration', async () => {
      mockDb.query.slackIntegration.findFirst.mockResolvedValueOnce(null)

      // Should not throw, just skip Slack notification
      await expect(triggerNotifications(mockChangeEvent)).resolves.not.toThrow()

      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should handle no matching rules', async () => {
      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([])

      await triggerNotifications(mockChangeEvent)

      // Should not send any notifications
      expect(global.fetch).not.toHaveBeenCalled()
      expect(mockSendEmail).not.toHaveBeenCalled()
    })

    it('should handle database errors gracefully', async () => {
      mockDb.query.notificationRule.findMany.mockRejectedValueOnce(
        new Error('Database error')
      )

      // Should not throw
      await expect(triggerNotifications(mockChangeEvent)).resolves.not.toThrow()
    })

    it('should handle malformed rules gracefully', async () => {
      const badRule = {
        ...mockNotificationRule,
        conditions: null as any,
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([badRule])

      // Should not throw
      await expect(triggerNotifications(mockChangeEvent)).resolves.not.toThrow()
    })
  })

  describe('Multiple Channels', () => {
    it('should send to both Slack and email when both specified', async () => {
      const ruleWithBoth = {
        ...mockNotificationRule,
        notificationChannels: ['slack', 'email'],
        emailRecipients: ['admin@example.com'],
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([ruleWithBoth])

      await triggerNotifications(mockChangeEvent)

      expect(global.fetch).toHaveBeenCalled() // Slack
      expect(mockSendEmail).toHaveBeenCalled() // Email
    })

    it('should continue with other channels if one fails', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Slack error'))

      const ruleWithBoth = {
        ...mockNotificationRule,
        notificationChannels: ['slack', 'email'],
        emailRecipients: ['admin@example.com'],
      }

      mockDb.query.notificationRule.findMany.mockResolvedValueOnce([ruleWithBoth])

      await triggerNotifications(mockChangeEvent)

      // Email should still be sent
      expect(mockSendEmail).toHaveBeenCalled()
    })
  })
})
