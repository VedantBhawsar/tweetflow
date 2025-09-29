import { z } from 'zod'

// Auth validations
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Tweet validations
export const tweetSchema = z.object({
  content: z
    .string()
    .min(1, 'Tweet content is required')
    .max(280, 'Tweet content must be 280 characters or less'),
  scheduledAt: z.date().optional(),
  workflowId: z.string().optional(),
})

export const tweetUpdateSchema = z.object({
  content: z
    .string()
    .min(1, 'Tweet content is required')
    .max(280, 'Tweet content must be 280 characters or less'),
  scheduledAt: z.date().optional(),
})

// Workflow validations
export const workflowSchema = z.object({
  name: z
    .string()
    .min(1, 'Workflow name is required')
    .max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  isActive: z.boolean().default(true),
  nodes: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['trigger', 'action', 'condition']),
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      data: z.any(),
    })
  ),
  connections: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
      sourceHandle: z.string().optional(),
      targetHandle: z.string().optional(),
    })
  ),
})

// User settings validations
export const userSettingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  timezone: z.string().optional(),
  notifications: z
    .object({
      email: z.boolean().default(true),
      push: z.boolean().default(false),
    })
    .optional(),
})

// API query validations
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const analyticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year']).default('week'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

// Subscription validations
export const subscriptionSchema = z.object({
  plan: z.enum(['free', 'pro', 'enterprise']),
  billingInterval: z.enum(['monthly', 'yearly']).default('monthly'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type TweetInput = z.infer<typeof tweetSchema>
export type TweetUpdateInput = z.infer<typeof tweetUpdateSchema>
export type WorkflowInput = z.infer<typeof workflowSchema>
export type UserSettingsInput = z.infer<typeof userSettingsSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
export type AnalyticsQueryInput = z.infer<typeof analyticsQuerySchema>
export type SubscriptionInput = z.infer<typeof subscriptionSchema>
