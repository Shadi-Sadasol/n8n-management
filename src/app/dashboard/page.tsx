'use client';

import React, { Suspense } from 'react';
import ScheduleSummary from '@/components/ScheduleSummary';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const summary = searchParams.get('summary');
  const loading = searchParams.get('loading') === 'true';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your schedule...</p>
        </div>
      </div>
    );
  }

  const displaySummary = summary || `No meetings scheduled.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Schedule</h1>
          <p className="text-gray-600 mt-2">Upcoming meetings overview</p>
        </div>
        <ScheduleSummary summary={displaySummary} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div><p className="text-gray-600">Loading your schedule...</p></div></div>}>
      <DashboardContent />
    </Suspense>
  );
}