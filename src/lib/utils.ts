import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { WorryDetailTypeKeys } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calcWisdom = (notThing: number, count: number) => {
  if (count === 0) return 0
  return Math.floor((notThing / count) * 10000) / 100 || 0
}

export const getWorryDetailKey = (wisdom: number) => {
  return (Math.round(wisdom / 10) * 10).toString() as WorryDetailTypeKeys
}
