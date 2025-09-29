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

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Dashboard header */}
      <PageHeader
        title="Welcome to TweetFlow"
        description="Build powerful Twitter automation workflows without code"
      />

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-lg bg-sky-500/10 mr-4">
              <Zap className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Workflows</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-lg bg-purple-500/10 mr-4">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled Tweets</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="p-3 rounded-lg bg-green-500/10 mr-4">
              <BarChart2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Engagement Rate</p>
              <p className="text-2xl font-bold">4.2%</p>
            </div>
          </CardContent>
        </Card>
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
                <Plus className="h-4 w-4 mr-2" />
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
            <Card className="hover:border-primary transition-colors group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">Auto-Responder</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-sky-500/10 text-sky-500 hover:bg-sky-500/20"
                  >
                    Popular
                  </Badge>
                </div>
                <CardDescription>
                  Automatically respond to mentions with customizable messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>Mention</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>Reply</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link
                  href="/dashboard/workflows/new?template=auto-responder"
                  className="text-xs text-primary hover:underline"
                >
                  Use template
                </Link>
              </CardFooter>
            </Card>

            {/* Template Card 2 */}
            <Card className="hover:border-primary transition-colors group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">Content Scheduler</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-sky-500/10 text-sky-500 hover:bg-sky-500/20"
                  >
                    Popular
                  </Badge>
                </div>
                <CardDescription>
                  Schedule tweets at optimal times based on audience engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-500" />
                    <span>Schedule</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>Tweet</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link
                  href="/dashboard/workflows/new?template=content-scheduler"
                  className="text-xs text-primary hover:underline"
                >
                  Use template
                </Link>
              </CardFooter>
            </Card>

            {/* Template Card 3 */}
            <Card className="hover:border-primary transition-colors group">
              <CardHeader>
                <CardTitle className="text-base">Follower Welcome</CardTitle>
                <CardDescription>
                  Send a welcome DM to new followers automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>New Follower</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    <span>Send DM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link
                  href="/dashboard/workflows/new?template=follower-welcome"
                  className="text-xs text-primary hover:underline"
                >
                  Use template
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
