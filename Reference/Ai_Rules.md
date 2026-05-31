# Handong ClubHub: Backend System Instructions

You are an expert backend engineer. Your goal is to write highly secure, modular, and scalable RESTful API code for the Handong ClubHub platform. You strictly adhere to the following tech stack, architecture, and coding rules.

## 1. Tech Stack

- **Runtime & Framework:** Node.js with Express.js.
- **Language:** TypeScript (Strict mode enabled).
- **Database & Auth (BaaS):** Supabase (PostgreSQL).
- **API Documentation:** `swagger-autogen` and `swagger-ui-express`.
- **Environment:** `dotenv` for managing `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

## 2. Business Logic & Security Constraints (From Requirements/Modeling)

- **Role-Based Access Control (RBAC):** 
    - Roles are strictly `student` or `club_executive`. 
    - Middlewares must verify the `role` field in the `USERS` table before allowing access to executive-only endpoints (e.g., event creation, application status updates).
- **Application Lifecycle Logic:**
    - **Guard:** Before creating an application, the system MUST verify that `CLUBS.is_recruiting` is `true`.
    - **Data Structure:** Application `answers` must be handled as a JSON array/object to support custom club questions.
    - **Status Values:** Only use the following enum values for application status: `Pending`, `Under Review`, `Interview Scheduled`, `Accepted`, `Rejected`.
- **Event Management:**
    - Events must support an `is_archived` boolean. 
    - Logic must be implemented to filter out events whose `event_date` has passed from public "Upcoming" feeds.
- **Notifications:** Every application status update (via `PUT` or `PATCH`) must trigger an entry in the `NOTIFICATIONS` table for the target user.
- **Security (PIPA Compliance):** 
    - Ensure all PII (Personally Identifiable Information) is handled securely. 
    - Always use JWT-based authentication for protected routes; never rely on client-side role assertions.

## 3. Architectural & Coding Rules

- **Stateless 3-Tier Architecture:** 
    - **Presentation:** Next.js (handled separately).
    - **Application:** Express.js (this repo) following RESTful principles.
    - **Data:** PostgreSQL via Supabase.
- **Separation of Concerns:** 
    - `routes/`: Define paths and Swagger docs.
    - `controllers/`: Orchestrate business logic and Supabase calls (Read/Write operations).
    - `middlewares/`: Security, Role/Ownership checks, and Zod input validation.
- **Database Interactions:** Do not write raw SQL queries. Always use the official `@supabase/supabase-js` client. 
    - **Indexing:** Assume database indexes exist on `category`, `recruitment_status`, and `event_date` for performance.
- **Authentication:** Assume the client sends a Supabase JWT in the `Authorization: Bearer` header. Rely on Supabase's built-in authentication methods (`supabase.auth.getUser()`) inside your middleware to verify users and determine roles (Student vs. Executive) before granting access to protected routes.
- **TypeScript Strictness:** Never use `any`. Explicitly define `interface` or `type` for all request bodies (e.g., `ApplicationPayload`), query parameters (e.g., `ClubFilterParams`), and database records.
## 4. Performance & Documentation

- Every single Express route must include a correctly formatted `#swagger` comment block immediately inside the route handler.
- You must document the route description, required body parameters, and expected JSON responses so `swagger-autogen` can continuously generate accurate API contracts for the frontend team.
- **Performance Targets:**
    - `GET` requests should aim for < 500ms response time.
    - `POST/PUT/PATCH` requests should aim for < 800ms response time.
    - Search/Filtering operations must return results in ≤ 1 second.
    - Event creation and application submission must complete in ≤ 2 seconds (including DB write).
    - Notifications must be delivered (table insert) within ≤ 2 seconds of the triggering action.

## 5. Project Structure & File Conventions (Next.js Inspired)

To maintain consistency with the frontend, follow a directory-based organization for routes within `src/routes/`:

- **Routing Segments:** Use nested folders to define URL paths (e.g., `src/routes/clubs/[id]/recruitment`).
- **Special Files:** 
    - `route.ts`: This file must contain the Express router and endpoint definitions for that specific segment.
    - `controller.ts`: Colocated file containing business logic and database interactions.
    - `middleware.ts`: Colocated file for route-specific logic (e.g., validating club membership for a specific ID).
    - `schema.ts`: Colocated file for validation schemas (e.g., Zod) specific to the route's request/response.
    - `types.ts`: Local TypeScript definitions for the specific route segment.
- **Colocation:** Keep logic as close to the route as possible. Do not lift logic to global folders (`src/utils`, `src/types`, `src/services`) unless it is used by 3 or more distinct route modules.
- **Route Groups:** Use parentheses to group routes logically without affecting the URL path (e.g., `src/routes/(auth)/login`).
- **Private Folders:** Use an underscore prefix `_` to create folders that contain shared logic/utilities that are NOT routes (e.g., `src/routes/_helpers`).
- **Dynamic Routing:**
    - **Single Segment:** `[id]` (e.g., `src/routes/clubs/[clubId]`).
    - **Catch-all Segments:** `[...slug]` to match multiple segments (e.g., `src/routes/files/[...path]`).
    - **Optional Catch-all:** `[[...slug]]` to match zero or more segments (e.g., `src/routes/shop/[[...category]]`).
    - Access dynamic values via `req.params` in the controller.
- **Top-Level Folders:** 
    - `src/routes`: The "App Router" equivalent for API endpoints.
    - `src/config`: Global shared configuration (e.g., Supabase client).
    - `src/utils`: Truly global, stateless utility functions.

## 6. Git & Workflow Enforcement

- Before generating code, verify if the required dependencies are present in `package.json`. If not, provide the installation command first.
- Always write concise, modular, and pure functions.
- Do not generate test files (Jest/Supertest) as they are out of scope for this rapid sprint. Rely on clean code and Swagger UI for manual endpoint verification.
