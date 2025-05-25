# TweetFlow

![TweetFlow](./public/logo.png)

## Automate Your Twitter Presence

TweetFlow is a powerful platform that helps you automate and optimize your Twitter (X) presence. Create, schedule, and analyze your Twitter content with an intuitive workflow builder.

## Features

- **User Authentication**: Secure login and registration with email/password or Google OAuth
- **Dashboard**: Comprehensive overview of your Twitter performance metrics
- **Workflow Builder**: Create custom automation workflows with a drag-and-drop interface
- **Analytics**: Track engagement, growth, and content performance
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React, TypeScript, TailwindCSS
- **Authentication**: NextAuth.js with JWT strategy
- **Database**: Prisma ORM with your choice of database (PostgreSQL recommended)
- **Styling**: TailwindCSS for responsive design
- **Deployment**: Ready to deploy on Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A database (PostgreSQL recommended)
- Twitter Developer API keys (for production use)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Twitter API (for production)
TWITTER_API_KEY="your-twitter-api-key"
TWITTER_API_SECRET="your-twitter-api-secret"
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tweetflow.git
cd tweetflow
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up the database

```bash
npx prisma migrate dev
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (site)/          # Main site routes
│   │   ├── (auth)/      # Authentication pages
│   │   └── dashboard/   # Dashboard pages
│   └── api/             # API routes
├── components/          # React components
├── lib/                 # Utility functions and configurations
└── prisma/              # Database schema and migrations
```

## Deployment

The easiest way to deploy TweetFlow is to use [Vercel](https://vercel.com):

```bash
npm run build
```

Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org) - The React Framework
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js
- [Prisma](https://prisma.io) - Next-generation ORM
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
