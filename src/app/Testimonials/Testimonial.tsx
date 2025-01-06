import React from "react";
import Testimonial from "../components/TestimonialCard";

const testimonials = [
  {
    name: "John Doe",
    role: "Web Developer",
    image: "/student1.jpg",
    feedback:
      "Edulite has completely changed the way I learn. The courses are well-structured and the instructors are top-notch!",
    rating: 4.5,
  },
  {
    name: "Jane Smith",
    role: "Data Scientist",
    image: "/student2.jpg",
    feedback:
      "Thanks to Edulite, I landed my dream job. The hands-on projects and career support are amazing!",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "UX Designer",
    image: "/student3.jpg",
    feedback:
      "Edulite's interactive courses made learning so much fun and effective. Highly recommend it!",
    rating: 4.5,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="text-center mb-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">
        What Our Students Say
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Hear from our satisfied learners who have transformed their careers with
        Edulite.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, idx) => (
          <Testimonial key={idx} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
