# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TweetFlow is a Twitter automation platform built for developers and solopreneurs. It allows users to create, schedule, and analyze Twitter content through a drag-and-drop workflow builder interface.

## Development Commands

### Core Commands
- `bun dev` - Start development server with Turbopack
- `bun build` - Build production application
- `bun start` - Start production server
- `bun run lint` - Run Biome for code quality checks
- `bun run format` - Format code with Biome

**Important**: This project requires Bun as the package manager (enforced via preinstall script).

### Database Commands
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Run database migrations in development
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio for database management

## Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: TailwindCSS v4 with shadcn/ui components, Framer Motion for animations
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)
- **Database**: MongoDB with Prisma ORM
- **State Management**: Zustand for client state, TanStack Query for server state
- **Package Manager**: Bun (required)
- **Deployment**: Vercel-ready with optimized build process

### Project Structure

#### App Router Structure (`src/app/`)
- `(site)/` - Main application routes with grouped layout
  - `(auth)/` - Authentication pages (login, register, logout)
  - `dashboard/` - Protected dashboard area with analytics and workflows
  - Root landing page and legal pages (terms, privacy)
- `api/` - Next.js API routes for backend functionality
  - `auth/` - NextAuth.js authentication endpoints
  - `subscribe-user/` - User subscription handling

#### Component Organization (`src/components/`)
- `ui/` - Reusable shadcn/ui components (extensive collection)
- `landing/` - Marketing page components (Hero, Features, Pricing, etc.)
- `dashboard/` - Dashboard-specific components (DashboardLayout, WorkflowBuilder)
- `providers/` - React context providers (Session, Query)
- `common/` - Shared components across sections

#### Core Libraries (`src/lib/`)
- `authconfig.ts` - NextAuth.js configuration with Google OAuth and credentials
- `prisma.ts` - Prisma client singleton
- `utils.ts` - Utility functions including cn() for class merging
- `nodemailer.ts` - Email configuration

### Database Schema (Prisma + MongoDB)

Key models:
- `User` - User accounts with authentication data
- `Account` - OAuth account linking (NextAuth.js)
- `Session` - User sessions (NextAuth.js)
- `Tweet` - Tweet content and scheduling data
- `SubscribeUser` - Email subscriptions
- `VerificationToken` - Email verification tokens

Uses MongoDB with CUID IDs and proper relations between users and their content.

### Authentication Flow

NextAuth.js setup with:
- Google OAuth provider
- Email/password credentials with bcrypt hashing
- JWT session strategy
- Custom sign-in/sign-out pages
- Prisma adapter for database persistence

### Development Environment

- TypeScript with strict mode enabled
- Biome for linting and formatting (configured in biome.json)
- Path aliases: `@/*` maps to `src/*`
- MongoDB database connection via `DATABASE_URL`
- Form handling with react-hook-form and Zod validation

## Key Features in Development

### Completed
- User authentication system (OAuth + credentials)
- Landing page with marketing components
- Dashboard infrastructure
- Database schema and models
- Component library setup with shadcn/ui

### In Progress
- Workflow builder with drag-and-drop functionality
- Twitter API integration for posting and analytics
- Scheduling system for automated tweets
- Analytics dashboard

## Environment Variables Required

```env
DATABASE_URL="mongodb-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="google-oauth-client-id"
GOOGLE_CLIENT_SECRET="google-oauth-client-secret"
```

## Development Notes

- **Package Manager**: Must use Bun (npm/yarn/pnpm will fail due to preinstall script)
- **Linting**: Uses Biome instead of ESLint/Prettier for faster performance
- **Styling**: TailwindCSS v4 with extensive use of Radix UI components via shadcn/ui
- **State Management**: Zustand for client-side state, TanStack Query for server state
- **Forms**: react-hook-form with Zod schemas for validation
- **Icons**: Lucide React for consistent iconography
- **Database**: MongoDB with Prisma (not PostgreSQL as might be expected)