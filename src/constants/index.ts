// Application constants
export const APP_CONFIG = {
  name: 'TweetFlow',
  description: 'Automate Your Twitter Presence',
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  WORKFLOWS: '/dashboard/workflows',
  ANALYTICS: '/dashboard/analytics',
  SETTINGS: '/dashboard/settings',
  BILLING: '/dashboard/billing',
  TWEETS: '/dashboard/tweets',
} as const;

export const API_ROUTES = {
  AUTH: '/api/auth',
  TWEETS: '/api/tweets',
  WORKFLOWS: '/api/workflows',
  ANALYTICS: '/api/analytics',
  USERS: '/api/users',
  BILLING: '/api/billing',
  WEBHOOKS: '/api/webhooks',
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: ['5 scheduled tweets', 'Basic analytics', '1 workflow'],
    limits: {
      tweets: 5,
      workflows: 1,
      accounts: 1,
    },
  },
  PRO: {
    name: 'Pro',
    price: 19,
    features: ['Unlimited tweets', 'Advanced analytics', 'Unlimited workflows', 'Priority support'],
    limits: {
      tweets: -1, // unlimited
      workflows: -1,
      accounts: 3,
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    features: ['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support'],
    limits: {
      tweets: -1,
      workflows: -1,
      accounts: 10,
    },
  },
} as const;

export const WORKFLOW_NODE_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action',
  CONDITION: 'condition',
} as const;

export const TWEET_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  POSTED: 'posted',
  FAILED: 'failed',
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to access this resource',
  FORBIDDEN: 'You do not have permission to access this resource',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later',
  RATE_LIMIT: 'Too many requests. Please try again later',
} as const;

export const SUCCESS_MESSAGES = {
  TWEET_SCHEDULED: 'Tweet scheduled successfully',
  WORKFLOW_CREATED: 'Workflow created successfully',
  SETTINGS_UPDATED: 'Settings updated successfully',
  ACCOUNT_CONNECTED: 'Twitter account connected successfully',
} as const;