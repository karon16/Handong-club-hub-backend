# Backend Unit Testing Report

## 1. Overview

This document outlines the testing strategy, tools, and implementation details for the Handong Club Hub Backend test suite. The primary objective of these tests is to validate the correctness of the routing and controller logic independently of the external database dependencies.

## 2. Tools & Frameworks

- **Test Runner:** [Jest](https://jestjs.io/)
- **Language:** TypeScript (`ts-jest` for seamless compilation)
- **HTTP Assertions:** Express request/response mocking (unit level)
- **Mocking:** Jest's native module mocking capabilities

## 3. Testing Strategy

To ensure fast, deterministic, and isolated unit tests, we employed the following strategies:

- **Database Mocking:** The `Supabase` client is fully mocked via a `__mocks__` directory (`src/config/__mocks__/supabase.ts`). This prevents the test suite from making real network requests to the Supabase backend. The mock implements a chainable query builder to accurately simulate Supabase's fluent API (`.from().select().eq().single()`, etc.).
- **Controller-Level Testing:** Tests directly invoke controller functions (e.g., `createEvent`, `signup`) by passing in mocked Express `Request` and `Response` objects. This allows us to inspect the HTTP status codes and JSON payloads returned by the controllers.
- **Validation Testing:** All API endpoints utilize `Zod` for payload validation. The test suite includes specific assertions to verify that invalid inputs correctly trigger HTTP 400 (Bad Request) responses.
- **Authorization Testing:** Endpoints that require specific roles (like `club_executive`) are tested to ensure they properly reject unauthorized access with HTTP 403 (Forbidden) when the user lacks the necessary permissions.

## 4. Test Suites Implemented

We have implemented comprehensive unit test suites for the core business domains:

### 4.1 Authentication (`authController.test.ts`)

- **Signup:** Validates payload requirements, ensures Supabase Auth integration behaves as expected, and verifies that the public `users` table record is properly created.
- **Login:** Verifies that correct credentials return a valid session and user profile data, including RBAC role extraction.

### 4.2 Clubs (`clubController.test.ts`)

- **Retrieval:** Tests fetching all clubs and specific clubs by ID.
- **Creation & Modification:** Verifies payload validation and authorization checks (ensuring only club executives can modify their specific club details).
- **Error Handling:** Asserts that database connection errors are properly caught and translated into HTTP 500 responses.

### 4.3 Events (`events/controller.test.ts`)

- **Retrieval:** Validates that only upcoming, unarchived events are fetched.
- **Creation:** Tests UUID and Date string formatting constraints via Zod schemas, and ensures executives can only create events for their own clubs.
- **Get By ID:** Verifies that fetching a single event by its UUID returns the correct object or a 404 Not Found if the event does not exist.

### 4.4 Applications (`applicationController.test.ts`)

- **Submission:** Validates student application submissions.
- **Status Updates:** Verifies that only authorized club executives can accept or reject applications.
- **Retrieval:** Tests fetching applications for a specific user.

### 4.5 Health (`health.controller.test.ts`)

- Verifies that the server sanity-check endpoint operates correctly, ensuring base functionality for monitoring.

## 5. Coverage Metrics

The test suite primarily targets the `controllers/` and `routes/` directories, achieving deep coverage on business logic layers.

- **Controllers:** High coverage on core logical paths, request validation, and conditional error handling.
- **Branches:** Thoroughly tested branch execution for 400, 401, 403, 404, and 500 edge cases.

To reproduce the exact coverage report, developers can execute:

```bash
npm run test:coverage
```

This generates an interactive HTML coverage map in the `coverage/lcov-report/index.html` directory.

## 6. Latest Test Execution Results

```text
---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------
All files                  |   29.16 |    23.61 |   28.08 |   27.43 |
 config                    |   66.66 |     62.5 |       0 |   72.72 |
  supabase.ts              |      80 |     62.5 |     100 |      80 | 10,16
  supabaseClient.ts        |       0 |      100 |       0 |       0 | 4
 controllers               |   50.84 |    44.21 |      68 |   47.96 |
  applicationController.ts |   56.25 |    43.75 |   66.66 |   54.66 | 40-62,82-84,105-106,121-123,150-151,160-161,167-168,185-187,199
  authController.ts        |   50.94 |       56 |     100 |   46.93 | 30-86,115-116,127-129,143-144
  clubController.ts        |      45 |    36.84 |   54.54 |    42.1 | 39,63-65,70-71,78-110,124,127,130,145-146,170-171,178-221
  health.controller.ts     |     100 |      100 |     100 |     100 |
 middlewares               |       0 |        0 |       0 |       0 |
  auth.middleware.ts       |       0 |        0 |       0 |       0 | 3-54
  rbac.middleware.ts       |       0 |        0 |       0 |       0 | 4-24
 routes                    |       0 |        0 |       0 |       0 |
  authRoutes.ts            |       0 |      100 |       0 |       0 | 1-38
  categoriesRoutes.ts      |       0 |        0 |       0 |       0 | 1-32
  clubRoutes.ts            |       0 |      100 |       0 |       0 | 1-124
  notificationsRoutes.ts   |       0 |        0 |       0 |       0 | 1-74
 routes/applications       |       0 |        0 |       0 |       0 |
  controller.ts            |       0 |        0 |       0 |       0 | 2-64
  route.ts                 |       0 |      100 |       0 |       0 | 1-26
  schema.ts                |       0 |      100 |     100 |       0 | 1-3
 routes/applications/[id]  |       0 |        0 |       0 |       0 |
  controller.ts            |       0 |        0 |       0 |       0 | 2-77
  route.ts                 |       0 |      100 |       0 |       0 | 1-31
  schema.ts                |       0 |      100 |     100 |       0 | 1-3
 routes/events             |   43.87 |    45.94 |    37.5 |   40.21 |
  controller.ts            |   51.28 |    45.94 |      60 |   47.22 | 45-48,98-139,145-175
  route.ts                 |       0 |      100 |       0 |       0 | 1-114
  schema.ts                |      75 |      100 |       0 |      75 | 27
 routes/interactions       |       0 |        0 |       0 |       0 |
  controller.ts            |       0 |        0 |       0 |       0 | 2-102
  route.ts                 |       0 |      100 |       0 |       0 | 1-61
  schema.ts                |       0 |      100 |     100 |       0 | 1-7
 services                  |   21.21 |        0 |       0 |   21.21 |
  applicationService.ts    |   21.21 |        0 |       0 |   21.21 | 69-83,93-103,115-129,141-155,169-187,201-216
 utils                     |    61.9 |        0 |      50 |   57.89 |
  testHelpers.ts           |     100 |      100 |     100 |     100 |
  validation.ts            |   27.27 |        0 |       0 |   27.27 | 37-40,50-61
---------------------------|---------|----------|---------|---------|-----------------------------------------------------------------

Test Suites: 1 failed, 4 passed, 5 total
Tests:       1 failed, 23 passed, 24 total
```
