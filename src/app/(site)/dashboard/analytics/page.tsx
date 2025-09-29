"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart2, Calendar, ArrowUp, ArrowDown, Filter, Download, RefreshCw } from "lucide-react";

// Mock data for analytics
const mockWorkflowData = [
  { id: 1, name: "Tweet Engagement Responder", runs: 124, success: 118, failed: 6, avgTime: "1.2s" },
  { id: 2, name: "Content Scheduler", runs: 87, success: 85, failed: 2, avgTime: "0.8s" },
  { id: 3, name: "Follower Welcome", runs: 42, success: 42, failed: 0, avgTime: "1.5s" },
];

const mockTimelineData = [
  { date: "2025-05-18", runs: 28, success: 27, failed: 1 },
  { date: "2025-05-19", runs: 35, success: 33, failed: 2 },
  { date: "2025-05-20", runs: 42, success: 40, failed: 2 },
  { date: "2025-05-21", runs: 38, success: 37, failed: 1 },
  { date: "2025-05-22", runs: 45, success: 44, failed: 1 },
  { date: "2025-05-23", runs: 52, success: 50, failed: 2 },
  { date: "2025-05-24", runs: 48, success: 47, failed: 1 },
];

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [totalRuns, setTotalRuns] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      // Simulate API call to fetch analytics data
      setTimeout(() => {
        // Calculate totals
        const runs = mockWorkflowData.reduce((acc, curr) => acc + curr.runs, 0);
        const success = mockWorkflowData.reduce((acc, curr) => acc + curr.success, 0);
        setTotalRuns(runs);
        setSuccessRate(Math.round((success / runs) * 100));
        setIsLoading(false);
      }, 1000);
    }
  }, [status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <DashboardLayout user={session.user}>
        <div className="h-full flex flex-col">
          {/* Analytics header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Workflow Analytics</h1>
            <p className="text-slate-400">Monitor the performance of your Twitter automation workflows</p>
          </div>

          {/* Time range selector and refresh button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${timeRange === range ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Analytics overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Workflow Runs</p>
                  <p className="text-3xl font-bold text-white">{totalRuns}</p>
                </div>
                <div className="p-2 rounded-lg bg-sky-500/20">
                  <BarChart2 className="h-5 w-5 text-sky-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">12%</span>
                <span className="text-slate-400 ml-1">vs previous {timeRange}</span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-white">{successRate}%</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/20">
                  <ArrowUp className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">3%</span>
                <span className="text-slate-400 ml-1">vs previous {timeRange}</span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Average Run Time</p>
                  <p className="text-3xl font-bold text-white">1.2s</p>
                </div>
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowDown className="h-3 w-3 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">8%</span>
                <span className="text-slate-400 ml-1">vs previous {timeRange}</span>
              </div>
            </div>
          </div>

          {/* Timeline chart */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Workflow Runs Timeline</h2>
            <div className="h-64 flex items-end justify-between">
              {mockTimelineData.map((day) => {
                const height = (day.runs / 60) * 100; // Scale to percentage of max height
                const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                return (
                  <div key={day.date} className="flex flex-col items-center">
                    <div className="relative w-12 flex justify-center">
                      <div 
                        className="w-8 bg-sky-500/20 rounded-t-sm" 
                        style={{ height: `${height}%` }}
                      >
                        <div 
                          className="w-8 bg-sky-500 rounded-t-sm absolute bottom-0" 
                          style={{ height: `${(day.success / day.runs) * height}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">{date}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sky-500 rounded-sm mr-2"></div>
                <span className="text-xs text-slate-400">Successful</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sky-500/20 rounded-sm mr-2"></div>
                <span className="text-xs text-slate-400">Failed</span>
              </div>
            </div>
          </div>

          {/* Workflow performance table */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-lg font-semibold text-white p-4 border-b border-slate-700">Workflow Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/30">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Workflow</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Runs</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Success</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Failed</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Avg. Time</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {mockWorkflowData.map((workflow) => (
                    <tr key={workflow.id} className="border-t border-slate-700 hover:bg-slate-700/20">
                      <td className="py-3 px-4 text-white">{workflow.name}</td>
                      <td className="py-3 px-4 text-right text-slate-300">{workflow.runs}</td>
                      <td className="py-3 px-4 text-right text-green-400">{workflow.success}</td>
                      <td className="py-3 px-4 text-right text-red-400">{workflow.failed}</td>
                      <td className="py-3 px-4 text-right text-slate-300">{workflow.avgTime}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-block px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                          {Math.round((workflow.success / workflow.runs) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return null;
}
