// /src/app/courses/[id]/page.tsx
import React from "react";

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = params.id;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Course Details</h1>
      <p className="mt-4">Details for course ID: {courseId}</p>
    </div>
  );
}
