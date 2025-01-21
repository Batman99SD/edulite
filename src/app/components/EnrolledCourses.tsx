import React, { useState, useEffect } from "react";

async function fetchEnrolledCourses() {
  try {
    const response = await fetch("/api/enroll", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch enrolled courses");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
}

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const enrolledCourses = await fetchEnrolledCourses();
        setCourses(enrolledCourses);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (courses.length === 0) {
    return <p>No courses enrolled yet.</p>;
  }

  return (
    <div>
      <h1>Your Enrolled Courses</h1>
      <ul>
        {courses.map(
          (course: { id: number; title: string; description: string }) => (
            <li key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
