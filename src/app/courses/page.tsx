"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
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

        // Filter enrolled courses
        const enrolled = allCoursesData.filter((course: Course) =>
          enrolledIds.includes(course.id)
        );
        setEnrolledCourses(enrolled);
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

  // Group courses by category
  const groupedCourses = allCourses.reduce<Record<string, Course[]>>(
    (acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = [];
      }
      acc[course.category].push(course);
      return acc;
    },
    {}
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4 sm:px-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-700">
          Explore Our Courses
        </h1>
        {userName && (
          <p className="text-lg text-gray-600 mb-4 text-center">
            Welcome, {userName}!
          </p>
        )}
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl">
          Whether you want to kickstart a new career, upskill for your current
          job, or learn something new for fun, we have a course for you.
        </p>

        {/* Enrolled Courses Section */}
        {enrolledCourses.length > 0 && (
          <div className="mb-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Your Enrolled Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categorized Courses Section */}
        {Object.entries(groupedCourses).map(([category, courses]) => (
          <div key={category} className="mb-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledCourseIds.includes(course.id)}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
