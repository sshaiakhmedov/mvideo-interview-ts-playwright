import { test } from '@playwright/test';

/**
 * Skips the current test or suite if running in a CI/CD environment.
 * @param reason - The reason for skipping on CI. Defaults to a generic message.
 */
export function skipOnCICD(reason: string = 'Skipped on CI due to environment restrictions.') {
  test.skip(!!process.env.CI, reason);
}
