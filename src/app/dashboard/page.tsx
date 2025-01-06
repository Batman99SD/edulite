// /src/app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        setUserName(userData.name);
        setEmail(userData.email);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-700">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Here you can manage courses and content.
          </p>
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              User Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <p className="text-gray-900">{userName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <p className="text-gray-900">{email}</p>
            </div>
          </div>
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded">
            Add Course
          </button>
        </div>
      </div>
    </>
  );
}
