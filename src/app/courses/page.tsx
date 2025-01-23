"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  duration: string;
  difficulty: string;
  rating: number;
  instructor: string;
}

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      try {
        // Fetch user and their enrolled courses
        const userResponse = await fetch("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const userData = await userResponse.json();
        setUserName(userData.name);

        // Extract enrolled course IDs from user data
        const enrolledIds = userData.Enrollments.map(
          (enrollment: any) => enrollment.course.id
        );
        setEnrolledCourseIds(enrolledIds);

        // Fetch all courses
        const coursesResponse = await fetch("/api/courses");
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const allCoursesData = await coursesResponse.json();
        setAllCourses(allCoursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to enroll.");
      return;
    }

    try {
      // Fetch user info to get userId
      const userResponse = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const userData = await userResponse.json();
      const userId = userData.id; // Assuming the response has `id`

      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to enroll.");
        return;
      }

      setEnrolledCourseIds((prev) => [...prev, courseId]);
      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4 sm:px-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-700">
          Explore Our Courses
        </h1>
        {userName && (
          <p className="text-lg text-gray-600 mb-4 text-center">
            Welcome back, {userName}!
          </p>
        )}
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl">
          Whether you want to kickstart a new career, upskill for your current
          job, or learn something new for fun, we have a course for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {allCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              onEnroll={handleEnroll} // Pass handleEnroll function here
            />
          ))}
        </div>
      </div>
    </>
  );
}
