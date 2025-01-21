"use client";

import Image from "next/image";
import Link from "next/link";
import CourseCard from "./components/CourseCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Testimonial from "./Testimonials/Testimonial";
import courses from "@/data/coursesData";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token in home:", token);
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
      fetchAllCourses();
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Headers:", {
        Authorization: `Bearer ${token}`,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUser(userData);
      setEnrolledCourses(userData.Enrollments.map((e) => e.course)); // Extract enrolled courses
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses.");
      }

      const coursesData = await response.json();
      setAllCourses(coursesData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <header className="relative w-full py-12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white text-center">
        <div
          className="absolute inset-0 bg-opacity-50 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">Edulite</h1>
          <p className="mt-4 text-xl">
            {isLoggedIn
              ? "Empowering your learning journey, one step at a time."
              : "Upskill, Explore, and Succeed with our expert-led courses."}
          </p>
          {!isLoggedIn && (
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/signup">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all">
                  Get Started
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="flex flex-col items-center py-10 px-4 sm:px-20">
        {isLoggedIn ? (
          <>
            {/* Logged-In View */}
            <section className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                {/* Welcome back! */}
                {isLoggedIn
                  ? `Welcome back, ${user?.name || "User"}!`
                  : "Upskill, Explore, and Succeed with our expert-led courses."}
              </h2>
              <p className="text-lg text-gray-700">
                Keep pushing towards your goals. You've got this!
              </p>
            </section>
            <section className="w-full max-w-7xl gap-8 mb-10">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Your Enrolled Courses
              </h2>
              <div className="grid gap-8 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">
                  Recommended Courses
                </h2>
                <p className="text-lg text-gray-700">
                  Explore new topics and expand your knowledge.
                </p>
              </div>
              <div className="grid gap-8 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {allCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Logged-Out View */}
            <section className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Why Choose Edulite?
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {/* Expert Instructors */}
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-blue-100 text-blue-600 rounded-full shadow-lg hover:scale-110 transform transition-all">
                    <i className="fas fa-chalkboard-teacher text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mt-4">
                    Expert Instructors
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-xs">
                    Learn from the best in the industry.
                  </p>
                </div>

                {/* Flexible Learning */}
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-green-100 text-green-600 rounded-full shadow-lg hover:scale-110 transform transition-all">
                    <i className="fas fa-clock text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mt-4">
                    Flexible Learning
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-xs">
                    Study at your own pace, anytime.
                  </p>
                </div>

                {/* Affordable Pricing */}
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-yellow-100 text-yellow-600 rounded-full shadow-lg hover:scale-110 transform transition-all">
                    <i className="fas fa-dollar-sign text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mt-4">
                    Affordable Pricing
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-xs">
                    Access high-quality education for less.
                  </p>
                </div>

                {/* Interactive Courses */}
                <div className="flex flex-col items-center">
                  <div className="p-6 bg-purple-100 text-purple-600 rounded-full shadow-lg hover:scale-110 transform transition-all">
                    <i className="fas fa-laptop-code text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mt-4">
                    Interactive Courses
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-xs">
                    Engaging lessons with hands-on activities.
                  </p>
                </div>
              </div>
            </section>
            <section className="flex flex-wrap justify-center gap-8 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Explore Our Top Courses
              </h3>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
            <Testimonial />

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link href="/login">
                <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                  Signup
                </span>
              </Link>
            </div>
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
