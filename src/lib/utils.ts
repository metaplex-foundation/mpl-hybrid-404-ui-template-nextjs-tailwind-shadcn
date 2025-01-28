import { publicKey } from "@metaplex-foundation/umi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a token amount or Token account into a human-readable string with proper decimal places
 * @param tokenAccountOrAmount - Either a Token object or raw bigint amount to format
 * @param decimals - Optional number of decimal places when passing raw bigint amount. Required when passing an amount.
 * @returns Formatted string with proper decimal places and thousands separators
 * @example
 * // Token account with 9 decimals and amount 1234567890
 * formatTokenAmount(tokenAccount) // Returns "1.234567890"
 * 
 * // Raw amount with 6 decimals
 * formatTokenAmount(1234567890n, 6) // Returns "1,234.567890"
 */
export function formatTokenAmount(tokenAmount: bigint, decimals: number): string {
  const tokenAccount = { amount: tokenAmount, header: { lamports: { decimals: decimals } } };
  const divisor = BigInt(10 ** decimals);
  const whole = tokenAccount.amount / divisor;
  const remainder = tokenAccount.amount % divisor;
  
  // Pad remainder with leading zeros to match decimal places
  const remainderStr = remainder.toString().padStart(decimals, '0');
  
  // Remove trailing zeros and add commas for cleaner display
  const formatted = `${whole.toString()}.${remainderStr}`.replace(/\.?0+$/, '');
  return formatted;
}


export const shortenAddress = (address: string, chars = 4) => {
  return address.slice(0, chars) + "..." + address.slice(-chars);
};

export const isValidPublicKey = (key: string) => {
  console.log("validating key", key);
  try {
    publicKey(key);
  } catch (error) {
    return false;
  }
  return true;
};
