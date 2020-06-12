// Type definitions for referral-codes 1.0.0
// Project: referral-codes
// Definitions by: Zack Smith <https://github.com/zack37>

// eslint-disable-next-line no-undef
export as namespace referralCodes;

export enum Charsets {
  NUMBERS = 'numbers',
  ALPHABETIC = 'alphabetic',
  ALPHANUMERIC = 'alphanumeric',
}
export interface GenerateConfig {
  count?: number;
  length?: number;
  charset?: string;
  prefix?: string;
  postfix?: string;
  pattern?: string;
}

export const CHARSETS: Charsets;
export function generate(config: GenerateConfig): string[];
export function charset(name: Charsets): string;

export = {
  CHARSETS,
  generate,
  charset,
};
