"use client";

import AdminDashboard from "../AdminDashboard";

// Force dynamic rendering - don't attempt static generation
export const dynamic = 'force-dynamic';

export default function AdminApplicationsPage() {
  return <AdminDashboard initialSection="applications" />;
}
