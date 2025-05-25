"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart2, Calendar, Clock, Plus, Zap, Twitter, ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('workflows');

    useEffect(() => {
        // If not authenticated, redirect to sign-in page
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin mb-4"></div>
                    <p className="text-white text-xl">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (status === "authenticated" && session?.user) {
        return (
            <DashboardLayout user={session.user}>
                <div className="h-full flex flex-col">
                    {/* Dashboard header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome to TweetFlow</h1>
                        <p className="text-slate-400">Build powerful Twitter automation workflows without code</p>
                    </div>

                    {/* Dashboard stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center">
                            <div className="p-3 rounded-lg bg-sky-500/20 mr-4">
                                <Zap className="h-6 w-6 text-sky-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Active Workflows</p>
                                <p className="text-2xl font-bold text-white">3</p>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center">
                            <div className="p-3 rounded-lg bg-purple-500/20 mr-4">
                                <Calendar className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Scheduled Tweets</p>
                                <p className="text-2xl font-bold text-white">12</p>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center">
                            <div className="p-3 rounded-lg bg-green-500/20 mr-4">
                                <BarChart2 className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Engagement Rate</p>
                                <p className="text-2xl font-bold text-white">4.2%</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-slate-700 mb-6">
                        <div className="flex space-x-6">
                            <button
                                onClick={() => setActiveTab('workflows')}
                                className={`pb-3 font-medium text-sm ${activeTab === 'workflows' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                My Workflows
                            </button>
                            <button
                                onClick={() => setActiveTab('templates')}
                                className={`pb-3 font-medium text-sm ${activeTab === 'templates' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                Templates
                            </button>
                        </div>
                    </div>

                    {/* Workflows */}
                    {activeTab === 'workflows' && (
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">My Workflows</h2>
                                <Link 
                                    href="/dashboard/workflows/new"
                                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Workflow
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Workflow cards */}
                                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500 transition-colors group">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">Tweet Engagement Responder</h3>
                                            <div className="bg-green-500/20 text-green-400 text-xs font-medium py-1 px-2 rounded">Active</div>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2">Automatically respond to mentions and retweets with personalized messages</p>
                                    </div>
                                    <div className="p-4 flex items-center text-sm">
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Mention</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 mx-2 text-slate-600" />
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Reply</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0 flex justify-between">
                                        <div className="text-xs text-slate-500">Created 3 days ago</div>
                                        <Link href="/dashboard/workflows/1" className="text-xs text-sky-400 hover:text-sky-300 group-hover:underline">Edit workflow</Link>
                                    </div>
                                </div>

                                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500 transition-colors group">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">Content Scheduler</h3>
                                            <div className="bg-green-500/20 text-green-400 text-xs font-medium py-1 px-2 rounded">Active</div>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2">Schedule tweets at optimal times based on audience engagement patterns</p>
                                    </div>
                                    <div className="p-4 flex items-center text-sm">
                                        <div className="flex items-center text-slate-400">
                                            <Clock className="h-4 w-4 mr-2 text-purple-400" />
                                            <span>Schedule</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 mx-2 text-slate-600" />
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Tweet</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0 flex justify-between">
                                        <div className="text-xs text-slate-500">Created 1 week ago</div>
                                        <Link href="/dashboard/workflows/2" className="text-xs text-sky-400 hover:text-sky-300 group-hover:underline">Edit workflow</Link>
                                    </div>
                                </div>

                                {/* Create new workflow card */}
                                <Link 
                                    href="/dashboard/workflows/new"
                                    className="bg-slate-800/50 rounded-lg border border-dashed border-slate-700 overflow-hidden hover:border-sky-500 transition-colors flex flex-col items-center justify-center p-6 text-center h-full"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                                        <Plus className="h-6 w-6 text-sky-400" />
                                    </div>
                                    <h3 className="font-medium text-white mb-1">Create New Workflow</h3>
                                    <p className="text-sm text-slate-400">Build a custom automation workflow</p>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Templates */}
                    {activeTab === 'templates' && (
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">Workflow Templates</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Template cards */}
                                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500 transition-colors group">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">Auto-Responder</h3>
                                            <div className="bg-sky-500/20 text-sky-400 text-xs font-medium py-1 px-2 rounded">Popular</div>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2">Automatically respond to mentions with customizable messages</p>
                                    </div>
                                    <div className="p-4 flex items-center text-sm">
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Mention</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 mx-2 text-slate-600" />
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Reply</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0 flex justify-end">
                                        <Link href="/dashboard/workflows/new?template=auto-responder" className="text-xs text-sky-400 hover:text-sky-300 group-hover:underline">Use template</Link>
                                    </div>
                                </div>

                                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500 transition-colors group">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">Content Scheduler</h3>
                                            <div className="bg-sky-500/20 text-sky-400 text-xs font-medium py-1 px-2 rounded">Popular</div>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2">Schedule tweets at optimal times based on audience engagement</p>
                                    </div>
                                    <div className="p-4 flex items-center text-sm">
                                        <div className="flex items-center text-slate-400">
                                            <Clock className="h-4 w-4 mr-2 text-purple-400" />
                                            <span>Schedule</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 mx-2 text-slate-600" />
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Tweet</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0 flex justify-end">
                                        <Link href="/dashboard/workflows/new?template=content-scheduler" className="text-xs text-sky-400 hover:text-sky-300 group-hover:underline">Use template</Link>
                                    </div>
                                </div>

                                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500 transition-colors group">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white">Follower Welcome</h3>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2">Send a welcome DM to new followers automatically</p>
                                    </div>
                                    <div className="p-4 flex items-center text-sm">
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>New Follower</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 mx-2 text-slate-600" />
                                        <div className="flex items-center text-slate-400">
                                            <Twitter className="h-4 w-4 mr-2 text-sky-400" />
                                            <span>Send DM</span>
                                        </div>
                                    </div>
                                    <div className="p-4 pt-0 flex justify-end">
                                        <Link href="/dashboard/workflows/new?template=follower-welcome" className="text-xs text-sky-400 hover:text-sky-300 group-hover:underline">Use template</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        );
    }

    // Fallback if status is somehow neither loading nor authenticated
    return null;
}