import React from "react";
import Hero from "../components/Hero";
import StatCard from "../components/StatCard";
import InfoCard from "../components/InfoCard";
import TeamMemberCard from "../components/TeamMemberCard";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-50">
        <Navbar />
        <Hero
          title="About Us"
          subtitle="Our journey to transform online education"
        />
        <main className="flex flex-col items-center py-16 px-4 sm:px-20 space-y-16">
          {/* Our Mission Section */}
          <section className="max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Edulite, our mission is to make quality education
                  accessible to everyone, everywhere. We aim to create a
                  platform that empowers learners by providing expertly designed
                  courses, tailored resources, and an engaging learning
                  experience.
                </p>
              </div>
              <div className="flex-1">
                <img
                  src="/images/3974104.jpg"
                  alt="Mission"
                  className="rounded-xl shadow-lg w-full object-cover h-96"
                />
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="bg-white shadow-md p-8 rounded-lg w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Learning
                </h3>
                <p className="text-gray-600 mt-2">
                  We believe in continuous growth and fostering a love for
                  learning.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-600 p-4 rounded-full inline-block mb-4">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Community
                </h3>
                <p className="text-gray-600 mt-2">
                  Collaboration and diversity are at the heart of what we do.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-600 p-4 rounded-full inline-block mb-4">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Innovation
                </h3>
                <p className="text-gray-600 mt-2">
                  Embracing technology to deliver cutting-edge education
                  solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Our Story
            </h2>
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Edulite was founded with the vision of transforming the way
                  people learn. From humble beginnings to a platform that serves
                  thousands of learners, our journey has been fueled by a
                  passion for education and a commitment to excellence.
                </p>
              </div>
              <div className="flex-1">
                <img
                  src="/images/story.jpg"
                  alt="Our Story"
                  className="rounded-xl shadow-lg w-full object-cover h-96"
                />
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="w-full text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700">
              By the Numbers
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard number="50K+" label="Students Enrolled" />
              <StatCard number="1.2K+" label="Courses Available" />
              <StatCard number="200+" label="Expert Instructors" />
              <StatCard number="95%" label="Satisfaction Rate" />
            </div>
          </section>

          {/* Team Section */}
          <section className="w-full max-w-6xl">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Meet Our Team
            </h2>
            <p className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              Passionate educators and industry experts dedicated to your
              success.
            </p>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <TeamMemberCard
                photo="/images/team1.jpg"
                name="Adam Keylane"
                role="CEO & Founder"
              />
              <TeamMemberCard
                photo="/images/p-5.jpeg"
                name="John Smith"
                role="Head of Education"
              />
              <TeamMemberCard
                photo="/images/p4.avif"
                name="Fatima Ademyo"
                role="Marketing Lead"
              />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
