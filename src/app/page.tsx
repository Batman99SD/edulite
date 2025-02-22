"use client";

import Link from "next/link";
import CourseCard from "./components/CourseCard";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Testimonial from "./Testimonials/Testimonial";
import Footer from "./components/Footer";

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

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token in home:", token);
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }
    fetchAllCourses();
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
      console.log("Fetched User Data:", userData);
      setUser(userData);

      setEnrolledCourses(userData.Enrollments.map((e) => e.course));
      setIsNewUser(
        userData.Enrollments.length === 0 && !localStorage.getItem("signup")
      );

      const enrolledIds = userData.Enrollments.map(
        (enrollment: any) => enrollment.course.id
      );
      setEnrolledCourseIds(enrolledIds);

      // setEnrolledCourses(userData.Enrollments.map((e) => e.course)); // Extract enrolled courses
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
                {isNewUser
                  ? `Welcome, ${user?.name || "User"}!`
                  : `Welcome back, ${user?.name || "User"}!`}
              </h2>
              <p className="text-lg text-gray-700">
                {isNewUser
                  ? "Explore and enroll in your first course today!"
                  : "Continue learning and achieving your goals!"}
              </p>
              {/* <p className="text-lg text-gray-700">
                Keep pushing towards your goals. You've got this!
              </p> */}
            </section>
            {enrolledCourses.length > 0 && (
              <section className="w-full max-w-7xl gap-8 mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                  Your Enrolled Courses
                </h2>
                <div className="grid gap-8 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {enrolledCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={enrolledCourseIds.includes(course.id)}
                      onEnroll={handleEnroll}
                    />
                  ))}
                </div>
              </section>
            )}
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
                {allCourses.slice(3, 9).map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourseIds.includes(course.id)}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            </section>

            {/* <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button> */}
          </>
        ) : (
          <>
            {/* Logged-Out View */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl text-gray-700 font-bold mb-8">
                  Why Choose Edulite?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <i className="fas fa-graduation-cap text-blue-500 text-4xl mb-4"></i>
                    <h3 className="text-xl text-gray-600 font-semibold mb-2">
                      Expert Instructors
                    </h3>
                    <p className="text-gray-600">
                      Learn from industry-leading experts across various fields.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <i className="fas fa-book text-blue-500 text-4xl mb-4"></i>
                    <h3 className="text-xl text-gray-600 font-semibold mb-2">
                      Comprehensive Content
                    </h3>
                    <p className="text-gray-600">
                      Access a wide range of up-to-date, engaging materials.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <i className="fas fa-chart-line text-blue-500 text-4xl mb-4"></i>
                    <h3 className="text-xl text-gray-600 font-semibold mb-2">
                      Track Your Progress
                    </h3>
                    <p className="text-gray-600">
                      Monitor your learning journey with intuitive tools.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex flex-wrap justify-center gap-8 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Explore Our Top Courses
              </h3>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {allCourses.slice(0, 6).map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourseIds.includes(course.id)}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            </section>
            <Testimonial />

            {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
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
            </div> */}
          </>
        )}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer> */}
      <Footer />
    </div>
  );
}
