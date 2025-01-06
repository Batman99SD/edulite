// /src/app/dashboard/page.tsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Here you can manage courses and content.</p>
      <button className="mt-4 bg-primary text-white px-6 py-2 rounded">
        Add Course
      </button>
    </div>
  );
}
