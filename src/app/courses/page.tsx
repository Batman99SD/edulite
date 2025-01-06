import React from "react";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import courses from "@/data/coursesData";

export default function CoursesPage() {
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
      </div>
    </>
  );
}
