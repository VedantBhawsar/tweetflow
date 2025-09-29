"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WorkflowBuilder from "@/components/dashboard/WorkflowBuilder";

// Content component that uses useSearchParams
function WorkflowContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get('template');

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading workflow builder...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <DashboardLayout user={session.user}>
        <div className="h-full flex flex-col">
          <WorkflowBuilder />
        </div>
      </DashboardLayout>
    );
  }

  return null;
}

// Main page component that wraps the content in a Suspense boundary
export default function NewWorkflowPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading workflow builder...</p>
        </div>
      </div>
    }>
      <WorkflowContent />
    </Suspense>
  );
}
