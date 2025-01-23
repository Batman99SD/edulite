import React from "react";
import CourseDetail from "@/app/components/CourseDetail";
import Navbar from "@/app/components/Navbar";

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params.id;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.statusText}`);
    }

    const course = await response.json();

    if (!course) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold">Course Not Found</h1>
          <p className="mt-4">
            Sorry, we couldn't find the course you're looking for.
          </p>
        </div>
      );
    }

    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col bg-gray-50 py-10 px-4 sm:px-20">
          <CourseDetail
            title={course.title}
            description={course.description}
            duration={course.duration}
            difficulty={course.difficulty}
            rating={course.rating}
            link={course.link}
            content={course.content || []}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching course details:", error);

    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="mt-4">
          Sorry, something went wrong. Please try again later.
        </p>
      </div>
    );
  }
}
