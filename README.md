# Handong ClubHub Backend

Welcome to the backend repository for the **Handong ClubHub** platform. This system is a robust, modular RESTful API designed to manage club registrations, users, and activities securely.

## Tech Stack

- **Runtime & Framework**: Node.js with Express.js
- **Language**: TypeScript (Strict Mode)
- **Database & Auth (BaaS)**: Supabase (PostgreSQL)
- **API Documentation**: `swagger-autogen` and `swagger-ui-express`
- **Formatting & Linting**: Prettier, Husky, and `lint-staged`

## Architecture & Directory Structure

We enforce a strict **Separation of Concerns**. Please do not write business logic directly in route definitions.

```text
.
├── src/
│   ├── config/      # Application configurations (e.g., Supabase client setup)
│   ├── controllers/ # Business logic and database interactions
│   ├── middlewares/ # Express middlewares (Authentication, Validation)
│   ├── routes/      # API route definitions
│   ├── types/       # Global TypeScript interfaces and types
│   └── server.ts    # Express application entry point
├── .env             # Environment variables (Do not commit)
├── .prettierrc      # Prettier formatting rules
├── package.json     # Project metadata and dependencies
└── tsconfig.json    # TypeScript compiler options
```

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your machine.

### 1. Installation

Clone the repository and install all dependencies:

```bash
git clone https://github.com/karon16/Handong-club-hub-backend.git
cd Handong-club-hub-backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory (this file is git-ignored) and add your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Available Scripts

- `npm run dev` - Starts the development server using `ts-node-dev` with hot-reloading.
- `npm run build` - Compiles the TypeScript code into JavaScript inside the `/dist` folder.
- `npm start` - Runs the compiled application from `/dist/server.js` (for production).
- `npm run swagger` - Generates the `swagger.json` file for API documentation based on your route comments.

### 4. Verifying the Setup (Health Check)

To ensure the server is running correctly after initialization, start the development server (`npm run dev`) and test the root health check endpoint.

Using **curl** in a new terminal:

```bash
curl http://localhost:4000/
```

_(Note: Replace `4000` with your actual PORT if it differs)._

You should receive a `200 OK` JSON response:

```json
{
  "status": "server online"
}
```

Alternatively, you can verify this by simply navigating to `http://localhost:4000/` in your web browser.

## API Documentation (Swagger)

All Express routes **must** include a correctly formatted `#swagger` comment block immediately inside the route handler. Run `npm run swagger` to regenerate the documentation whenever you modify or add routes. This ensures the frontend team always has an accurate API contract to work with.

### Accessing the Interactive UI

Once the server is running (`npm run dev`), you can access the visual documentation by navigating to:
**[http://localhost:[PORT]/api-docs](http://localhost:[PORT]/api-docs)**

## Contribution Guidelines

- **TypeScript Strictness**: Never use `any`. Always explicitly define types/interfaces for requests, queries, and database payloads in `src/types/`.
- **Database & Auth**: Never write raw SQL queries; use the `@supabase/supabase-js` client. Use Supabase JWT validation in middlewares to protect routes.
- **Git Hooks**: We use **Husky** and **lint-staged**. Whenever you commit code, it will automatically be formatted using Prettier. Do not bypass these hooks.
