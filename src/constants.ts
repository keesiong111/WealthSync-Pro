import { BankRate } from './types';

export const MY_BANKS: BankRate[] = [
  { bank: 'Maybank', country: 'MY', savingsRate: 0.15, fixedDepositRate: 2.85, updatedAt: new Date().toISOString() },
  { bank: 'CIMB', country: 'MY', savingsRate: 0.20, fixedDepositRate: 2.90, updatedAt: new Date().toISOString() },
  { bank: 'Public Bank', country: 'MY', savingsRate: 0.15, fixedDepositRate: 2.80, updatedAt: new Date().toISOString() },
  { bank: 'Hong Leong', country: 'MY', savingsRate: 0.25, fixedDepositRate: 3.00, updatedAt: new Date().toISOString() },
];

export const SG_BANKS: BankRate[] = [
  { bank: 'DBS', country: 'SG', savingsRate: 0.05, fixedDepositRate: 3.20, updatedAt: new Date().toISOString() },
  { bank: 'OCBC', country: 'SG', savingsRate: 0.05, fixedDepositRate: 3.10, updatedAt: new Date().toISOString() },
  { bank: 'UOB', country: 'SG', savingsRate: 0.05, fixedDepositRate: 3.15, updatedAt: new Date().toISOString() },
];

export const RETIREMENT_AGE_GOAL = 40;
export const MIGRATION_AGE = 30;
