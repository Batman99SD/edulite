import React from "react";

export default function CourseDetail({
  title,
  description,
  duration,
  difficulty,
  rating,
  link,
  content,
}: {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  rating: number;
  link: string;
  content: string[];
}) {
  const extractVideoId = (url: string | undefined) => {
    if (!url) {
      console.log("No URL provided");
      return null;
    }
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    if (!match) {
      console.log("URL does not match expected pattern:", url);
    }
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(link);
  console.log("Video ID:", videoId);
  console.log("Provided YouTube link:", link);

  return (
    <div className="min-h-screen bg-gray-50">
      {videoId ? (
        <div className="w-3/4 h-[calc(100vh-24rem)] mx-auto">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        </div>
      ) : (
        <div className="w-3/4 h-[calc(100vh-24rem)] mx-auto bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Video not available</span>
        </div>
      )}
      <div className="p-6 w-3/4 h-[calc(100vh-24rem)] mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg mb-4">{description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-500">Duration: {duration}</span>
          <span className="text-gray-500">Level: {difficulty}</span>
          <span className="text-yellow-500">⭐ {rating}</span>
        </div>
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What You'll Learn
        </h2> */}
        <ul className="list-disc list-inside text-gray-600">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
