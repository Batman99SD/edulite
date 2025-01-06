// /src/app/courses/page.tsx
import React from "react";

export default function CoursesPage() {
  const courses = [
    { id: 1, title: "Web Development", category: "Technology" },
    { id: 2, title: "Graphic Design", category: "Art" },
    // More courses here...
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="border-b py-2">
            <a href={`/courses/${course.id}`} className="text-primary">
              {course.title} - {course.category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
