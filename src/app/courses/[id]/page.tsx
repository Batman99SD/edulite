import React from "react";
import CourseDetail from "@/app/components/CourseDetail";
import courses from "@/data/coursesData";
import Navbar from "@/app/components/Navbar";

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = parseInt(params.id);
  const course = courses.find((course) => course.id === courseId);

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
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4 sm:px-20">
        <CourseDetail
          title={course.title}
          description={course.description}
          duration={course.duration}
          difficulty={course.difficulty}
          rating={course.rating}
          image={course.imageSrc}
          content={course.content}
        />
      </div>
    </>
  );
}
