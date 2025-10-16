/**
 * Test Utilities and Helpers
 *
 * Provides mock data, fixtures, and helper functions for testing
 */

export const mockOrganization = {
  id: 'org_test123',
  name: 'Test Organization',
  slug: 'test-org',
  createdAt: new Date('2024-01-01'),
}

export const mockUser = {
  id: 'user_test123',
  email: 'test@example.com',
  name: 'Test User',
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
}

export const mockAdAccount = {
  id: 'acc_test123',
  organizationId: 'org_test123',
  platform: 'meta' as const,
  platformAccountId: 'act_123456',
  accountName: 'Test Ad Account',
  accessToken: 'test_access_token',
  refreshToken: 'test_refresh_token',
  tokenExpiresAt: new Date(Date.now() + 3600000),
  isActive: true,
  lastSyncedAt: new Date(),
  createdAt: new Date('2024-01-01'),
}

export const mockChangeEvent = {
  id: 'event_test123',
  organizationId: 'org_test123',
  adAccountId: 'acc_test123',
  platform: 'meta' as const,
  changeType: 'campaign_status_changed' as const,
  entityType: 'campaign',
  entityId: 'camp_123',
  entityName: 'Test Campaign',
  changes: {
    status: {
      before: 'PAUSED',
      after: 'ACTIVE',
    },
  },
  metadata: {},
  detectedAt: new Date(),
}

export const mockSlackIntegration = {
  id: 'slack_test123',
  organizationId: 'org_test123',
  teamId: 'T123ABC',
  teamName: 'Test Workspace',
  accessToken: 'xoxb-test-token',
  botUserId: 'U123BOT',
  incomingWebhook: {
    channel: '#alerts',
    channelId: 'C123CHANNEL',
    configurationUrl: 'https://slack.com/config',
    url: 'https://hooks.slack.com/services/TEST/WEBHOOK',
  },
  scope: 'chat:write,channels:read',
  createdAt: new Date('2024-01-01'),
}

export const mockNotificationRule = {
  id: 'rule_test123',
  organizationId: 'org_test123',
  name: 'Test Rule',
  description: 'Alert on campaign changes',
  isActive: true,
  platforms: ['meta'],
  changeTypes: ['campaign_status_changed'],
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
  notificationChannels: ['slack'],
  slackChannelId: 'C123CHANNEL',
  emailRecipients: [],
  createdAt: new Date('2024-01-01'),
}

export const mockSubscription = {
  id: 'sub_test123',
  organizationId: 'org_test123',
  stripeCustomerId: 'cus_test123',
  stripeSubscriptionId: 'sub_stripe123',
  stripePriceId: 'price_pro',
  status: 'active' as const,
  currentPeriodStart: new Date('2024-01-01'),
  currentPeriodEnd: new Date('2024-02-01'),
  cancelAtPeriodEnd: false,
  trialStart: null,
  trialEnd: null,
  createdAt: new Date('2024-01-01'),
}

/**
 * Mock fetch responses for external APIs
 */
export const mockFetchResponse = (data: any, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
  } as Response)
}

/**
 * Mock database operations
 */
export const createMockDb = () => ({
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockResolvedValue([]),
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  execute: jest.fn().mockResolvedValue([]),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
})

/**
 * Wait for async operations in tests
 */
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock Next.js request object
 */
export const createMockRequest = (options: {
  method?: string
  url?: string
  body?: any
  headers?: Record<string, string>
} = {}) => {
  const {
    method = 'GET',
    url = 'http://localhost:3000',
    body = null,
    headers = {},
  } = options

  return new Request(url, {
    method,
    headers: new Headers(headers),
    body: body ? JSON.stringify(body) : null,
  })
}

/**
 * Mock environment variables for a test
 */
export const withEnv = (envVars: Record<string, string>, fn: () => void | Promise<void>) => {
  const original = { ...process.env }

  return async () => {
    Object.assign(process.env, envVars)
    try {
      await fn()
    } finally {
      process.env = original
    }
  }
}
