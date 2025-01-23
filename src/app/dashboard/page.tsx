"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    // role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not logged in.");
        return;
      }

      try {
        const response = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        console.log("Fetched User Data:", data);

        setUserData({
          name: data.name,
          email: data.email,
          role: data.role,
        });

        setFormData({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Cannot update user data.");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }

      const updatedData = await response.json();
      console.log("Updated User Data:", updatedData);

      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-700">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your profile and account details here.
          </p>
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              User Information
            </h2>

            {isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <p className="text-gray-900">{userData.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
                {/* <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role:
                  </label>
                  <p className="text-gray-900">{userData.role}</p>
                </div> */}
                <button
                  onClick={handleEditToggle}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
