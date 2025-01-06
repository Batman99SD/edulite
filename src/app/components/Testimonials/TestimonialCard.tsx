import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface TestimonialProps {
  name: string;
  role: string;
  image: string;
  feedback: string;
  rating: number; // Out of 5
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  image,
  feedback,
  rating,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-left hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600">{feedback}</p>
      <div className="mt-4 flex items-center gap-1 text-yellow-500">
        {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
          <i key={idx} className="fas fa-star"></i>
        ))}
        {rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
      </div>
    </div>
  );
};

export default Testimonial;
