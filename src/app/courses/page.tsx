"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Course {
  id: string;
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

        // Extract enrolled courses from user data
        const enrolled = userData.Enrollments.map((enrollment: any) => ({
          ...enrollment.course,
        }));
        setEnrolledCourses(enrolled);

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
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {enrolledCourses.length > 0 && (
          <section className="w-full mt-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              Your Enrolled Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
