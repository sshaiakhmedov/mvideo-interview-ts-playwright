# Mvideo Playwright Demo

Playwright project for Mvideo interview.

## Features

- UI tests using PO Model
- API tests (Postman and FakeStore examples)
- Chrome configuration with bot bypass

## Tech Stack

- Playwright
- TypeScript
- Zod

## Getting Started

### Installation

```bash
npm install
npx playwright install chromium
```

### Running Tests

```bash
# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api
```

## Folder Structure

- `tests/`: Spec files
- `pages/`: Page objects
- `api/`: API helpers
- `components/`: UI components
- `data/`: Test data
- `util/`: Fixtures
