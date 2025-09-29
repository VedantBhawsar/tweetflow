'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import {
  BarChart2,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PageHeader from '@/components/common/pageHeader'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// Mock data for analytics
const mockWorkflowData = [
  {
    id: 1,
    name: 'Tweet Engagement Responder',
    runs: 124,
    success: 118,
    failed: 6,
    avgTime: '1.2s',
  },
  {
    id: 2,
    name: 'Content Scheduler',
    runs: 87,
    success: 85,
    failed: 2,
    avgTime: '0.8s',
  },
  {
    id: 3,
    name: 'Follower Welcome',
    runs: 42,
    success: 42,
    failed: 0,
    avgTime: '1.5s',
  },
]

const mockTimelineData = [
  { date: '2025-05-18', runs: 28, success: 27, failed: 1 },
  { date: '2025-05-19', runs: 35, success: 33, failed: 2 },
  { date: '2025-05-20', runs: 42, success: 40, failed: 2 },
  { date: '2025-05-21', runs: 38, success: 37, failed: 1 },
  { date: '2025-05-22', runs: 45, success: 44, failed: 1 },
  { date: '2025-05-23', runs: 52, success: 50, failed: 2 },
  { date: '2025-05-24', runs: 48, success: 47, failed: 1 },
]

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [totalRuns, setTotalRuns] = useState(0)
  const [successRate, setSuccessRate] = useState(0)
  useEffect(() => {
    if (status === 'authenticated') {
      setTimeout(() => {
        const runs = mockWorkflowData.reduce((acc, curr) => acc + curr.runs, 0)
        const success = mockWorkflowData.reduce(
          (acc, curr) => acc + curr.success,
          0
        )
        setTotalRuns(runs)
        setSuccessRate(Math.round((success / runs) * 100))
        setIsLoading(false)
      }, 1000)
    }
  }, [status])

  const chartData = mockTimelineData.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    successful: day.success,
    failed: day.failed,
    total: day.runs,
  }))

  // Chart configuration
  const chartConfig = {
    successful: {
      label: 'Successful',
      color: 'hsl(var(--chart-1))', // or use "rgb(14, 165, 233)" for sky-500
    },
    failed: {
      label: 'Failed',
      color: 'hsl(var(--chart-2))', // or use "rgb(14, 165, 233, 0.2)" for sky-500/20
    },
  } satisfies ChartConfig

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Workflow Analytics"
        description="Monitor the performance of your Twitter automation workflows"
      />

      {/* Time range selector and refresh button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Analytics overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Workflow Runs
                </p>
                <p className="text-3xl font-bold">{totalRuns}</p>
              </div>
              <div className="p-2 rounded-lg bg-sky-500/10">
                <BarChart2 className="h-5 w-5 text-sky-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="text-muted-foreground ml-1">
                vs previous {timeRange}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Success Rate
                </p>
                <p className="text-3xl font-bold">{successRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-green-500/10">
                <ArrowUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">3%</span>
              <span className="text-muted-foreground ml-1">
                vs previous {timeRange}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Average Run Time
                </p>
                <p className="text-3xl font-bold">1.2s</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="text-muted-foreground ml-1">
                vs previous {timeRange}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Workflow Runs Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="successful"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                stackId="a"
              />
              <Bar
                dataKey="failed"
                fill="var(--color-secondary)"
                radius={[4, 4, 0, 0]}
                stackId="a"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Workflow performance table */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead className="text-right">Runs</TableHead>
                <TableHead className="text-right">Success</TableHead>
                <TableHead className="text-right">Failed</TableHead>
                <TableHead className="text-right">Avg. Time</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWorkflowData.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell className="text-right">{workflow.runs}</TableCell>
                  <TableCell className="text-right text-green-500">
                    {workflow.success}
                  </TableCell>
                  <TableCell className="text-right text-red-500">
                    {workflow.failed}
                  </TableCell>
                  <TableCell className="text-right">
                    {workflow.avgTime}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      {Math.round((workflow.success / workflow.runs) * 100)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
