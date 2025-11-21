"use client";

import AdminDashboard from "./AdminDashboard";

// Force dynamic rendering - don't attempt static generation
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return <AdminDashboard initialSection="applications" />;
}
