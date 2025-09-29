'use client'

import { useSession } from 'next-auth/react'
import { Suspense, useState } from 'react'
import {
  BarChart2,
  Calendar,
  Clock,
  Plus,
  Zap,
  Twitter,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/common/pageHeader'
import WorkflowCard from '@/components/common/workflowCard'
import WorkflowCardSkeleton from '@/components/loaders/workflowCardSkeleton'
import StatCard from '@/components/common/statCard'

const workflows = [
  {
    id: 1,
    title: 'Tweet Engagement Responder',
    description:
      'Automatically respond to mentions and retweets with personalized messages',
    active: true,
    footerText: 'Created 3 days ago',
    linkHref: '/dashboard/workflows/1',
    linkLabel: 'Edit workflow',
    steps: [
      { icon: Twitter, label: 'Mention', color: 'text-sky-500' },
      { icon: ArrowRight, label: '', color: '' },
      { icon: Twitter, label: 'Reply', color: 'text-sky-500' },
    ],
  },
  {
    id: 2,
    title: 'Content Scheduler',
    description:
      'Schedule tweets at optimal times based on audience engagement patterns',
    active: true,
    footerText: 'Created 1 week ago',
    linkHref: '/dashboard/workflows/2',
    linkLabel: 'Edit workflow',
    steps: [
      { icon: Clock, label: 'Schedule', color: 'text-purple-500' },
      { icon: ArrowRight, label: '', color: '' },
      { icon: Twitter, label: 'Tweet', color: 'text-sky-500' },
    ],
  },
]

const stats = [
  {
    icon: <Zap />,
    label: 'Active Workflows',
    value: 3,
    bgColor: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
  },
  {
    icon: <Calendar />,
    label: 'Scheduled Tweets',
    value: 12,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: <BarChart2 />,
    label: 'Engagement Rate',
    value: '4.2%',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
  {
    icon: <BarChart2 />,
    label: 'Engagement Rate',
    value: '4.2%',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
]

const templateCards = [
  {
    title: 'Auto-Responder',
    description: 'Automatically respond to mentions with customizable messages',
    badge: {
      label: 'Popular',
      show: true,
      className: 'bg-sky-500/10 text-sky-500 hover:bg-sky-500/20',
    },
    steps: [
      { icon: Twitter, label: 'Mention', color: 'text-sky-500' },
      { icon: Twitter, label: 'Reply', color: 'text-sky-500' },
    ],
    link: '/dashboard/workflows/new?template=auto-responder',
  },
  {
    title: 'Content Scheduler',
    description:
      'Schedule tweets at optimal times based on audience engagement',
    badge: {
      label: 'Popular',
      show: true,
      className: 'bg-sky-500/10 text-sky-500 hover:bg-sky-500/20',
    },
    steps: [
      { icon: Clock, label: 'Schedule', color: 'text-purple-500' },
      { icon: Twitter, label: 'Tweet', color: 'text-sky-500' },
    ],
    link: '/dashboard/workflows/new?template=content-scheduler',
  },
  {
    title: 'Follower Welcome',
    description: 'Send a welcome DM to new followers automatically',
    badge: {
      label: '',
      show: false, // no badge for this one
      className: '',
    },
    steps: [
      { icon: Twitter, label: 'New Follower', color: 'text-sky-500' },
      { icon: Twitter, label: 'Send DM', color: 'text-sky-500' },
    ],
    link: '/dashboard/workflows/new?template=follower-welcome',
  },
]

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Dashboard header */}
      <PageHeader
        title="Welcome to TweetFlow"
        description="Build powerful Twitter automation workflows without code"
      />

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="workflows" className="flex-1">
        <TabsList className="mb-6">
          <TabsTrigger value="workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Workflows</h2>
            <Button asChild>
              <Link href="/dashboard/workflows/new">
                <Plus className="h-4 w-4" />
                Create Workflow
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Workflow Card 1 */}

            <Suspense
              fallback={Array(5)
                .fill(0)
                .map((_, index) => (
                  <WorkflowCardSkeleton key={index} />
                ))}
            >
              {workflows.map((wf) => (
                <WorkflowCard
                  key={wf.id}
                  title={wf.title}
                  description={wf.description}
                  active={wf.active}
                  footerText={wf.footerText}
                  linkHref={wf.linkHref}
                  linkLabel={wf.linkLabel}
                  steps={wf.steps}
                />
              ))}
            </Suspense>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Workflow Templates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Template Card 1 */}
            {templateCards.map((card, index) => (
              <WorkflowCard
                key={index}
                description={card.description}
                title={card.title}
                active={false}
                footerText={card.badge.label}
                linkHref={card.link}
                linkLabel={card.badge.label}
                steps={card.steps}
                className="hover:border-primary transition-colors group"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
