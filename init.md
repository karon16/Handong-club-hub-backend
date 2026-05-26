# 🚀 Handong ClubHub: Backend Initialization Guide

Follow these steps sequentially in your terminal to bootstrap the Node.js/Express backend with TypeScript, Supabase, Swagger, and strict pre-commit quality gates.

## Step 1: Scaffold Node.js & Install Dependencies

Run the following commands to initialize the project and install all necessary runtime and development libraries.

```bash
# 1. Initialize the base project
mkdir clubhub-server
cd clubhub-server
npm init -y

# 2. Install Core Dependencies
npm install express cors dotenv @supabase/supabase-js swagger-ui-express swagger-autogen

# 3. Install TypeScript & Dev Dependencies
npm install -D typescript @types/node @types/express @types/cors ts-node-dev
npm install -D prettier husky lint-staged

```

## Step 2: Configure TypeScript

Generate the `tsconfig.json` file and set the output directory for the compiled code.

```bash
npx tsc --init

```

_Open `tsconfig.json` and ensure the following settings are uncommented/updated:_

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Step 3: Scaffold the Directory Structure

Create the modular folder structure required by the `GEMINI.md` architecture rules.

```bash
mkdir src
mkdir src/controllers src/routes src/middlewares src/config src/types
touch src/server.ts .env

```

## Step 4: Configure Prettier

Create a `.prettierrc` file in your root directory to enforce team formatting standards.

```bash
echo '{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}' > .prettierrc

```

## Step 5: Setup Husky & Lint-Staged

This creates a pre-commit hook that automatically formats your code every time you run `git commit`.

**1. Initialize Husky:**

```bash
npx husky install
npm pkg set scripts.prepare="husky install"

```

**2. Configure `lint-staged`:**
Open your `package.json` file and add the following blocks. Note that we are also adding the standard `dev`, `build`, and `swagger` scripts here:

```json
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "swagger": "node swagger.js",
    "start": "node dist/server.js",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,ts}": [
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }

```

**3. Add the pre-commit hook:**

```bash
npx husky add .husky/pre-commit "npx lint-staged"

```
