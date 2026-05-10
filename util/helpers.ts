import { test } from '@playwright/test';

/**
 * Skips the current test or suite if running in a CI/CD environment (GitHub Actions, GitLab, etc).
 * @param reason - The reason for skipping on CI. Defaults to a generic message.
 */
export function skipOnCICD(reason: string = 'Skipped on CI due to environment restrictions.') {
  test.skip(!!process.env.CI, reason);
}

/**
 * Skips the current test or suite if running ONLY in GitHub Actions.
 * @param reason - The reason for skipping on GitHub Actions. Defaults to a generic message.
 */
export function skipOnGitHubActions(reason: string = 'Skipped on GitHub Actions due to environment restrictions.') {
  test.skip(!!process.env.GITHUB_ACTIONS, reason);
}
