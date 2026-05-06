---
name: api-tests
description: Guidelines on how to write API tests using Playwright's APIRequestContext. Use this when adding or updating API test specs to ensure correctness and maintainability.
---

# API Test Creation Guidelines

## Overview

Playwright can be used for API testing alongside UI testing via the built-in `request` fixture, which provides an `APIRequestContext`. When writing API tests, we want to maintain separation of concerns and reusability.

## Required Test Coverage Strategy

When asked to write API tests for an endpoint, you MUST generate scenarios covering the following:
1. **Happy Path:** Valid request returns `200/201` and the correct data schema.
2. **Negative Path:** Invalid data (e.g., missing required fields, wrong data types) returns `400` Bad Request.
3. **Authentication/Authorization:** Missing, invalid, or expired tokens returns `401` or `403`.
4. **Edge/Boundary Cases:** Max length strings, empty datasets, etc.

## Guidelines & Rules

*** MUST DO: ***
1. **Use `request` fixture** instead of third-party libraries: `test('api test', async ({ request }) => { ... })`.
2. **Extract Payloads/Data:** If testing a POST/PUT with a large JSON body, move the payload to a separate file in the `data/` folder.
3. **Use API Helpers/Clients:** If you are calling the same endpoint across multiple tests, wrap those calls into an API client helper in an `api/` or `clients/` folder.
4. **Environment Variables:** Use the `.env` file for storing Base URLs, tokens, and API keys. Fetch them via `process.env`.
5. **Use correct assertions:** Use Playwright's `expect` assertions (e.g., `expect(response.ok()).toBeTruthy()`, `expect(response.status()).toBe(200)`).
6. **Organize tests:** Place the spec file in `tests/api/` or a project-specific subdirectory.

*** NEVER DO THE FOLLOWING: ***
1. Never store massive JSON payloads directly inside the `test()` block.
2. Never chain UI interactions in the same test block as a pure API test unless you are specifically testing UI-API boundaries (in which case, it's an E2E test, not an API test).

## Example Usage

```javascript
import { test, expect } from '../../util/fixtures';

test('fetch cart data returns 200', async ({ api }) => {
  const cart = await api.mvideo.getCartStatus();
  expect(cart.success).toBe(true);
});
```
