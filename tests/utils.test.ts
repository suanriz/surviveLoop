import { describe, it, expect } from 'vitest'

import { calcWisdom, cn, getWorryDetailKey } from '@/lib/utils'

describe('utils', () => {
  describe('calcWisdom', () => {
    it('should calculate wisdom correctly', () => {
      expect(calcWisdom(10, 100)).toBe(10)
      expect(calcWisdom(1, 3)).toBe(33.33)
      expect(calcWisdom(0, 100)).toBe(0)
    })

    it('should return 0 if count is 0', () => {
      expect(calcWisdom(10, 0)).toBe(0)
    })
  })

  describe('getWorryDetailKey', () => {
    it('should return correct key for given wisdom', () => {
      expect(getWorryDetailKey(0)).toBe('0')
      expect(getWorryDetailKey(4)).toBe('0')
      expect(getWorryDetailKey(5)).toBe('10')
      expect(getWorryDetailKey(9)).toBe('10')
      expect(getWorryDetailKey(10)).toBe('10')
      expect(getWorryDetailKey(14)).toBe('10')
      expect(getWorryDetailKey(15)).toBe('20')
      expect(getWorryDetailKey(95)).toBe('100')
    })
  })

  describe('cn', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
      expect(cn('foo', { bar: true })).toBe('foo bar')
      expect(cn('foo', { bar: false })).toBe('foo')
    })

    it('should handle tailwind conflicts', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2')
    })
  })
})
