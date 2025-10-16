# Testing Guide

Comprehensive testing suite for AdsX platform covering all mission-critical functionality.

## Test Coverage

### 🔐 OAuth Integrations
- **Meta (Facebook) Ads**: Authorization flow, token exchange, ad account fetching
- **Google Ads**: Authorization with offline access, refresh tokens, customer listing
- **Slack**: Workspace connection, webhook configuration, message posting

### 📡 Event Handling
- **Meta Webhooks**: Verification, campaign/ad set/ad changes, batch processing
- **Google Ads Polling**: Periodic change detection (via cron)
- **Change Detection**: Deep object comparison, diff generation

### 🔔 Notifications
- **Rule Evaluation**: Platform matching, change type filtering, condition logic
- **Slack Notifications**: Message formatting, error handling, rate limiting
- **Email Notifications**: HTML templates, batch sending, error recovery

### 🛠️ Core Logic
- **Change Detection Algorithm**: Status, budget, bid, targeting changes
- **Notification Triggering**: Rule matching, multi-channel delivery
- **Security**: CSRF protection, webhook signature validation

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### With Coverage Report
```bash
npm run test:coverage
```

### CI Mode (No Watch)
```bash
npm run test:ci
```

## Test Files

```
src/__tests__/
├── utils/
│   └── test-helpers.ts          # Mock data, fixtures, utilities
├── integration/
│   ├── meta-oauth.test.ts       # Meta OAuth flow tests
│   ├── google-oauth.test.ts     # Google OAuth flow tests
│   ├── slack-oauth.test.ts      # Slack OAuth flow tests
│   └── meta-webhooks.test.ts    # Meta webhook handling tests
└── lib/
    ├── change-detection.test.ts # Change detection logic tests
    └── notifications.test.ts    # Notification triggering tests
```

## Test Structure

Each test file follows the AAA pattern:
- **Arrange**: Set up test data and mocks
- **Act**: Execute the code under test
- **Assert**: Verify the outcome

Example:
```typescript
it('should detect campaign status change', () => {
  // Arrange
  const before = { status: 'PAUSED' }
  const after = { status: 'ACTIVE' }

  // Act
  const result = detectChanges(before, after)

  // Assert
  expect(result.hasChanges).toBe(true)
  expect(result.changes.status).toEqual({
    before: 'PAUSED',
    after: 'ACTIVE',
  })
})
```

## Critical Test Scenarios

### Meta OAuth Integration
✅ Authorization URL generation with correct scopes
✅ CSRF protection via state parameter
✅ Token exchange with authorization code
✅ Ad account fetching and storage
✅ Error handling (invalid code, network errors)
✅ Token expiration calculation

### Google OAuth Integration
✅ Authorization with offline access for refresh tokens
✅ Token exchange with refresh token
✅ Accessible customers fetching
✅ Customer details retrieval
✅ Refresh token usage for new access tokens
✅ Error handling (missing refresh token, API errors)

### Slack OAuth Integration
✅ Workspace connection
✅ Incoming webhook configuration
✅ Channel listing
✅ Message posting
✅ Rate limiting handling
✅ Error recovery

### Meta Webhook Handling
✅ Webhook verification
✅ Signature validation
✅ Campaign change events
✅ Ad set change events
✅ Ad creative changes
✅ Batch event processing
✅ Multiple ad accounts
✅ Unknown account handling

### Change Detection
✅ Status changes (ACTIVE, PAUSED, etc.)
✅ Budget changes (daily, lifetime)
✅ Bid changes (amount, strategy)
✅ Deep object comparison
✅ Array changes
✅ Multiple simultaneous changes
✅ Edge cases (null, undefined, empty objects)
✅ Performance with large objects

### Notification Triggering
✅ Rule matching by platform
✅ Rule matching by change type
✅ Condition evaluation (AND, OR)
✅ Field-level conditions (equals, changed_to, contains)
✅ Slack message formatting
✅ Email message formatting
✅ Multi-channel delivery
✅ Error handling and retry logic
✅ Notification logging
✅ Rate limiting and deduplication

## Mocking Strategy

### External APIs
All external API calls (Meta, Google, Slack) are mocked using `jest.fn()`:

```typescript
global.fetch = jest.fn()

// Mock successful response
(global.fetch as jest.Mock).mockResolvedValue({
  ok: true,
  json: async () => ({ data: [...] }),
})
```

### Database
Database operations are mocked to avoid test dependencies:

```typescript
const mockDb = {
  query: {
    adAccount: {
      findFirst: jest.fn(() => Promise.resolve(mockAdAccount)),
    },
  },
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(() => Promise.resolve([...])),
    })),
  })),
}
```

### Next.js APIs
Next.js navigation and server APIs are mocked in `jest.setup.js`:

```typescript
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
}))
```

## Coverage Goals

- **Unit Tests**: 90%+ coverage
- **Integration Tests**: All critical flows
- **Edge Cases**: Error scenarios, malformed data
- **Performance**: Large datasets, deep nesting

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Main branch commits
- Pre-deployment verification

CI configuration:
```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm ci
    - run: npm run test:ci
```

## Writing New Tests

### 1. Create Test File
```bash
touch src/__tests__/lib/your-feature.test.ts
```

### 2. Import Test Utilities
```typescript
import { mockOrganization, mockUser, createMockRequest } from '../utils/test-helpers'
```

### 3. Structure Tests
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Scenario 1', () => {
    it('should do something', () => {
      // Test implementation
    })
  })
})
```

### 4. Use Descriptive Names
✅ Good: `should detect campaign status change from PAUSED to ACTIVE`
❌ Bad: `test 1`

### 5. Test Edge Cases
- Null/undefined values
- Empty arrays/objects
- Malformed data
- Network errors
- Database failures

## Debugging Tests

### Run Single Test File
```bash
npx jest src/__tests__/lib/change-detection.test.ts
```

### Run Single Test
```bash
npx jest -t "should detect campaign status change"
```

### Debug with Node Inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome.

## Common Issues

### "Cannot find module '@/...'"
Solution: Check `jest.config.js` has correct `moduleNameMapper`

### "TypeError: fetch is not defined"
Solution: Mock fetch in `jest.setup.js` or individual test file

### "ReferenceError: Headers is not defined"
Solution: Use `jsdom` test environment in `jest.config.js`

### Tests timeout
Solution: Increase timeout or check for hanging promises

## Best Practices

1. **Keep tests focused**: One assertion per test (when possible)
2. **Use descriptive names**: Test name should explain what's being tested
3. **Mock external dependencies**: Don't make real API calls
4. **Test edge cases**: Null, undefined, empty, error scenarios
5. **Clean up**: Use `beforeEach` and `afterEach` to reset state
6. **Avoid test interdependence**: Each test should run independently
7. **Use factories**: Create reusable test data with helper functions

## Continuous Improvement

- Add tests for every bug fix
- Update tests when requirements change
- Review coverage reports regularly
- Refactor tests alongside production code
- Document complex test scenarios

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

**Test coverage is production-critical.** All mission-critical paths are covered with comprehensive tests to ensure reliability and prevent regressions.
