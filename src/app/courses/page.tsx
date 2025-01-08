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
  users?: User[];
}

interface CoursesPageProps {
  userId: string;
}

export default function CoursesPage({ userId }: CoursesPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
        // Filter enrolled courses based on userId
        const enrolled = data.filter((course: Course) =>
          course.users?.some((user: User) => user.id === userId)
        );
        setEnrolledCourses(enrolled);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4 sm:px-20">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-700">
          Explore Our Courses
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl">
          Whether you want to kickstart a new career, upskill for your current
          job, or learn something new for fun, we have a course for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {enrolledCourses.length > 0 && (
          <section className="w-full mt-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              Enrolled Courses
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
