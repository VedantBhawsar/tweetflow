"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WorkflowBuilder from "@/components/dashboard/WorkflowBuilder";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function WorkflowDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const workflowId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [workflow, setWorkflow] = useState<any>(null);

  // In a real app, you would fetch the workflow data from your API
  useEffect(() => {
    if (status === "authenticated") {
      // Simulate API call to fetch workflow
      setTimeout(() => {
        setWorkflow({
          id: workflowId,
          name: workflowId === "1" ? "Tweet Engagement Responder" : "Content Scheduler",
          active: true,
          createdAt: new Date().toISOString(),
          // In a real app, this would contain the actual workflow configuration
          config: {
            nodes: [
              {
                id: "trigger-1",
                type: "trigger",
                title: workflowId === "1" ? "New Tweet Mention" : "Schedule",
                description: workflowId === "1" ? "Triggers when someone mentions you in a tweet" : "Triggers at a scheduled time",
                position: { x: 100, y: 100 },
                config: {}
              },
              {
                id: "action-1",
                type: "action",
                title: workflowId === "1" ? "Send Reply" : "Send Tweet",
                description: workflowId === "1" ? "Reply to the mention with a message" : "Post a new tweet to your timeline",
                position: { x: 400, y: 100 },
                config: {}
              }
            ],
            connections: [
              {
                id: "connection-1",
                sourceId: "trigger-1",
                targetId: "action-1"
              }
            ]
          }
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [status, workflowId]);

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && session?.user && workflow) {
    return (
      <DashboardLayout user={session.user}>
        <div className="h-full flex flex-col">
          {/* Workflow header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link 
                href="/dashboard" 
                className="mr-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-slate-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{workflow.name}</h1>
                <p className="text-slate-400 text-sm">Last edited {new Date(workflow.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>

          {/* Workflow builder */}
          <div className="flex-1">
            <WorkflowBuilder initialWorkflow={workflow.config} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return null;
}
