# 📖 Handong ClubHub: Codebase Explanation

This document provides a high-level overview of the backend architecture, directory structure, and the purpose of each file within the Handong ClubHub project.

## 🏗 Architecture Overview
The project follows a **Modular Monolith** pattern with a strict **Separation of Concerns (SoC)**. As defined in `GEMINI.md`, business logic is decoupled from route definitions to ensure maintainability and scalability.

### Key Tech Stack
- **Express.js (v5)**: Web framework.
- **TypeScript**: For type safety and better developer experience.
- **Supabase**: Used as the Backend-as-a-Service (Database & Auth).
- **Swagger**: Automated API documentation.

## 🧠 Key Concepts

### Modular Monolith
We use a **Modular Monolith** approach. This means the entire backend is one application (easy to deploy), but the code is strictly organized into modules. This prevents "spaghetti code" and makes the system easier to scale or refactor into microservices later.

### Separation of Concerns (SoC)
Each part of the code has **one** job. 
- **Routes** define endpoints.
- **Controllers** handle business logic.
- **Middlewares** handle security and validation.
This makes the code easier to test and debug because logic isn't scattered everywhere.

### Why a Decoupled Backend?
- **Security**: The backend acts as a secure gatekeeper for Supabase data.
- **Flexibility**: The same API can serve Web, Mobile, or Desktop apps.
- **Scalability**: You can scale the API resources independently of the frontend.

### Deployment Simplicity
- **Stateless**: The server doesn't store local data, making it easy to run on cloud platforms.
- **Environment Ready**: Uses `.env` for all configurations.
- **Build Pipeline**: `npm run build` generates production-ready code in seconds.

---

## 📁 Directory Structure

### 1. Root Directory (Configuration & Metadata)
- **`package.json`**: Defines dependencies, metadata, and scripts (e.g., `npm run dev`, `npm run swagger`).
- **`tsconfig.json`**: Configuration for the TypeScript compiler (specifies strict mode and output directories).
- **`.prettierrc`**: Formatting rules to ensure consistent code style across the team.
- **`.env`**: (Not committed) Contains sensitive credentials like `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- **`GEMINI.md`**: A specialized instruction set for AI coding assistants to maintain strict architectural standards.
- **`init.md`**: A step-by-step bootstrap guide for setting up the environment from scratch.
- **`README.md`**: General project documentation, tech stack overview, and setup instructions.

### 2. API Documentation
- **`swagger.js`**: The configuration script for `swagger-autogen`. It scans the entry point to generate the API contract.
- **`swagger.json`**: The auto-generated Swagger specification file used by the UI.

### 3. Source Code (`/src`)
The core application logic resides here:

#### **`server.ts`**
The entry point of the application. It:
- Loads environment variables.
- Initializes the Express app.
- Sets up middlewares (CORS, JSON parsing).
- Configures the `/api-docs` route to serve the Swagger UI.
- Mounts the main router.

#### **`routes/`**
- **`index.ts`**: The central routing hub. It aggregates all sub-routes.
- **Rule**: Routes only define endpoints and include `#swagger` comments for documentation. They must delegate logic to Controllers.

#### **`controllers/`**
- This is where the core business logic lives.
- Controllers handle incoming requests, interact with the database (via Supabase), and return responses.
- *Example*: `health.controller.ts` (Handles the server health check).

#### **`middlewares/`**
- Contains functions that run before controllers.
- Primarily used for **Authentication** (verifying Supabase JWTs) and **Input Validation**.

#### **`swagger.js` & `swagger.json`**
- **Swagger** provides interactive API documentation. 
- It allows frontend developers to see and test endpoints in real-time without reading the backend source code.

#### **`config/`**
- Holds global configuration instances.
- *Example*: `supabaseClient.ts` (Initializes and exports the Supabase client for use across controllers).

#### **`types/`**
- Centralized TypeScript `interface` and `type` definitions.
- **Rule**: No `any` is allowed; every data structure (Request body, DB payload) must be typed here.

#### **`utils/`**
- Shared helper functions and utility classes that are used across multiple modules.

---

## 🚀 Workflow Summary
1.  **Develop**: Write code in `src/`.
2.  **Document**: Add `#swagger` comments inside your route handlers.
3.  **Generate**: Run `npm run swagger` to update the API documentation.
4.  **Verify**: Start the server with `npm run dev` and check `http://localhost:3000/api-docs`.
5.  **Commit**: Husky will automatically run `lint-staged` to format your code via Prettier before the commit is finalized.

---
*This file was generated to assist developers in understanding the Handong ClubHub backend ecosystem.*