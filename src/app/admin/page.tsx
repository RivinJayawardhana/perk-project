"use client";

import Dashboard from "@/components/admin/Dashboard";
import AdminLayout from "@/components/AdminLayout";

export default function AdminRoot() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}
