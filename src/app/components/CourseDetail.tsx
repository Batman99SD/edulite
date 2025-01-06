import React from "react";

export default function CourseDetail({
  title,
  description,
  duration,
  difficulty,
  rating,
  image,
  content,
}: {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  rating: number;
  image: string;
  content: string[];
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg mb-4">{description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-500">Duration: {duration}</span>
          <span className="text-gray-500">Level: {difficulty}</span>
          <span className="text-yellow-500">⭐ {rating}</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What You'll Learn
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
