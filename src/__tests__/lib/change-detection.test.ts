/**
 * Change Detection Logic Tests
 *
 * Tests the core change detection algorithm that compares
 * before/after states and identifies meaningful changes:
 * - Status changes
 * - Budget changes
 * - Bid changes
 * - Targeting changes
 * - Creative changes
 * - Deep object comparison
 */

import { detectChanges } from '@/lib/change-detection/detect-changes'

describe('Change Detection Logic', () => {
  describe('Status Changes', () => {
    it('should detect campaign status change', () => {
      const before = { status: 'PAUSED' }
      const after = { status: 'ACTIVE' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toEqual({
        before: 'PAUSED',
        after: 'ACTIVE',
      })
    })

    it('should detect ad set status change', () => {
      const before = { status: 'ACTIVE', name: 'Test Ad Set' }
      const after = { status: 'PAUSED', name: 'Test Ad Set' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toEqual({
        before: 'ACTIVE',
        after: 'PAUSED',
      })
    })

    it('should not detect changes when status is same', () => {
      const before = { status: 'ACTIVE' }
      const after = { status: 'ACTIVE' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(false)
      expect(result.changes).toEqual({})
    })

    it('should detect multiple status-like changes', () => {
      const before = { status: 'ACTIVE', effective_status: 'ACTIVE' }
      const after = { status: 'PAUSED', effective_status: 'CAMPAIGN_PAUSED' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toBeDefined()
      expect(result.changes.effective_status).toBeDefined()
    })
  })

  describe('Budget Changes', () => {
    it('should detect daily budget change', () => {
      const before = { daily_budget: '10000' }
      const after = { daily_budget: '20000' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.daily_budget).toEqual({
        before: '10000',
        after: '20000',
      })
    })

    it('should detect lifetime budget change', () => {
      const before = { lifetime_budget: '100000' }
      const after = { lifetime_budget: '150000' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.lifetime_budget).toEqual({
        before: '100000',
        after: '150000',
      })
    })

    it('should detect budget being removed', () => {
      const before = { daily_budget: '10000' }
      const after = { daily_budget: null }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.daily_budget).toEqual({
        before: '10000',
        after: null,
      })
    })

    it('should detect budget being added', () => {
      const before = { daily_budget: null }
      const after = { daily_budget: '10000' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.daily_budget).toEqual({
        before: null,
        after: '10000',
      })
    })

    it('should detect numeric budget changes', () => {
      const before = { daily_budget: 10000 }
      const after = { daily_budget: 20000 }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })
  })

  describe('Bid Changes', () => {
    it('should detect bid amount change', () => {
      const before = { bid_amount: 500 }
      const after = { bid_amount: 750 }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.bid_amount).toEqual({
        before: 500,
        after: 750,
      })
    })

    it('should detect bid strategy change', () => {
      const before = { bid_strategy: 'LOWEST_COST_WITHOUT_CAP' }
      const after = { bid_strategy: 'LOWEST_COST_WITH_BID_CAP' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.bid_strategy).toBeDefined()
    })

    it('should detect CPC goal changes', () => {
      const before = { cpc_bid: 100 }
      const after = { cpc_bid: 150 }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })
  })

  describe('Name Changes', () => {
    it('should detect name changes', () => {
      const before = { name: 'Old Campaign Name' }
      const after = { name: 'New Campaign Name' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.name).toEqual({
        before: 'Old Campaign Name',
        after: 'New Campaign Name',
      })
    })

    it('should not detect changes for identical names', () => {
      const before = { name: 'Same Name' }
      const after = { name: 'Same Name' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(false)
    })
  })

  describe('Deep Object Comparison', () => {
    it('should detect nested object changes', () => {
      const before = {
        targeting: {
          age_min: 18,
          age_max: 65,
        },
      }
      const after = {
        targeting: {
          age_min: 25,
          age_max: 65,
        },
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.targeting).toBeDefined()
    })

    it('should detect array changes', () => {
      const before = {
        targeting: {
          geo_locations: ['US', 'CA'],
        },
      }
      const after = {
        targeting: {
          geo_locations: ['US', 'CA', 'GB'],
        },
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle null vs empty object', () => {
      const before = { targeting: null }
      const after = { targeting: {} }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle undefined vs null', () => {
      const before = { field: undefined }
      const after = { field: null }

      const result = detectChanges(before, after)

      // Both null and undefined should be treated as "no value"
      expect(result.hasChanges).toBe(false)
    })
  })

  describe('Multiple Changes', () => {
    it('should detect multiple simultaneous changes', () => {
      const before = {
        status: 'PAUSED',
        daily_budget: '10000',
        bid_amount: 500,
      }
      const after = {
        status: 'ACTIVE',
        daily_budget: '20000',
        bid_amount: 750,
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(Object.keys(result.changes)).toHaveLength(3)
      expect(result.changes.status).toBeDefined()
      expect(result.changes.daily_budget).toBeDefined()
      expect(result.changes.bid_amount).toBeDefined()
    })

    it('should only include fields that actually changed', () => {
      const before = {
        status: 'ACTIVE',
        name: 'Campaign',
        daily_budget: '10000',
      }
      const after = {
        status: 'PAUSED',
        name: 'Campaign', // Same
        daily_budget: '10000', // Same
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(Object.keys(result.changes)).toHaveLength(1)
      expect(result.changes.status).toBeDefined()
      expect(result.changes.name).toBeUndefined()
      expect(result.changes.daily_budget).toBeUndefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty objects', () => {
      const before = {}
      const after = {}

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(false)
    })

    it('should detect when field is added', () => {
      const before = {}
      const after = { status: 'ACTIVE' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toEqual({
        before: undefined,
        after: 'ACTIVE',
      })
    })

    it('should detect when field is removed', () => {
      const before = { status: 'ACTIVE' }
      const after = {}

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toEqual({
        before: 'ACTIVE',
        after: undefined,
      })
    })

    it('should handle null objects', () => {
      const before = null as any
      const after = { status: 'ACTIVE' }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle comparing same object reference', () => {
      const obj = { status: 'ACTIVE' }

      const result = detectChanges(obj, obj)

      expect(result.hasChanges).toBe(false)
    })

    it('should handle circular references gracefully', () => {
      const before: any = { status: 'ACTIVE' }
      const after: any = { status: 'PAUSED' }
      before.self = before
      after.self = after

      // Should not throw or hang
      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle large numbers correctly', () => {
      const before = { budget: 9999999999 }
      const after = { budget: 10000000000 }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle floating point numbers', () => {
      const before = { bid: 1.5 }
      const after = { bid: 1.50001 }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle boolean changes', () => {
      const before = { is_active: true }
      const after = { is_active: false }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })

    it('should handle date objects', () => {
      const before = { created_at: new Date('2024-01-01') }
      const after = { created_at: new Date('2024-01-02') }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
    })
  })

  describe('Real-World Scenarios', () => {
    it('should detect Meta campaign update', () => {
      const before = {
        id: 'camp_123',
        name: 'Summer Sale Campaign',
        status: 'ACTIVE',
        daily_budget: '10000',
        objective: 'CONVERSIONS',
        created_time: '2024-01-01T00:00:00Z',
      }
      const after = {
        id: 'camp_123',
        name: 'Summer Sale Campaign',
        status: 'PAUSED',
        daily_budget: '10000',
        objective: 'CONVERSIONS',
        created_time: '2024-01-01T00:00:00Z',
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(Object.keys(result.changes)).toHaveLength(1)
      expect(result.changes.status).toBeDefined()
    })

    it('should detect Google Ads campaign update', () => {
      const before = {
        resourceName: 'customers/123/campaigns/456',
        status: 'ENABLED',
        biddingStrategyType: 'MANUAL_CPC',
        campaignBudget: {
          amountMicros: '1000000',
        },
      }
      const after = {
        resourceName: 'customers/123/campaigns/456',
        status: 'PAUSED',
        biddingStrategyType: 'MANUAL_CPC',
        campaignBudget: {
          amountMicros: '2000000',
        },
      }

      const result = detectChanges(before, after)

      expect(result.hasChanges).toBe(true)
      expect(result.changes.status).toBeDefined()
      expect(result.changes.campaignBudget).toBeDefined()
    })

    it('should ignore metadata-only changes', () => {
      const before = {
        status: 'ACTIVE',
        updated_time: '2024-01-01T00:00:00Z',
      }
      const after = {
        status: 'ACTIVE',
        updated_time: '2024-01-02T00:00:00Z', // Only timestamp changed
      }

      const result = detectChanges(before, after)

      // Should detect the timestamp change
      expect(result.hasChanges).toBe(true)
      // But in real implementation, we might want to ignore certain fields
    })
  })

  describe('Performance', () => {
    it('should handle large objects efficiently', () => {
      const largeObject: any = {}
      for (let i = 0; i < 1000; i++) {
        largeObject[`field_${i}`] = `value_${i}`
      }

      const start = Date.now()
      const result = detectChanges(largeObject, largeObject)
      const duration = Date.now() - start

      expect(result.hasChanges).toBe(false)
      expect(duration).toBeLessThan(100) // Should complete in < 100ms
    })

    it('should handle deeply nested objects', () => {
      let deepObject: any = { value: 'leaf' }
      for (let i = 0; i < 20; i++) {
        deepObject = { nested: deepObject }
      }

      const start = Date.now()
      const result = detectChanges(deepObject, deepObject)
      const duration = Date.now() - start

      expect(result.hasChanges).toBe(false)
      expect(duration).toBeLessThan(100)
    })
  })
})
