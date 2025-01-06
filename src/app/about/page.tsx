import React from "react";
import Hero from "../components/Hero";
import StatCard from "../components/StatCard";
import InfoCard from "../components/InfoCard";
import TeamMemberCard from "../components/TeamMemberCard";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Navbar />
      <Hero
        title="About Us"
        subtitle="Our journey to transform online education"
      />
      <main className="w-full flex flex-col items-center py-10 px-4 sm:px-20">
        {/* Mission Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Edulite, we aim to empower learners worldwide by providing
            high-quality, affordable, and flexible online education.
          </p>
        </section>

        {/* Vision and Values */}
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <InfoCard
            icon="/icon-mission.svg"
            title="Our Vision"
            description="To become a leading global platform for online education."
          />
          <InfoCard
            icon="/icon-values.svg"
            title="Our Values"
            description="Innovation, integrity, and inclusivity are at our core."
          />
          <InfoCard
            icon="/icon-community.svg"
            title="Our Community"
            description="Building a network of passionate learners and educators."
          />
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
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Passionate educators and industry experts dedicated to your success.
          </p>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <TeamMemberCard
              photo="/team-member-1.jpg"
              name="Jane Doe"
              role="CEO & Founder"
            />
            <TeamMemberCard
              photo="/team-member-2.jpg"
              name="John Smith"
              role="Head of Education"
            />
            <TeamMemberCard
              photo="/team-member-3.jpg"
              name="Emily Johnson"
              role="Marketing Lead"
            />
          </div>
        </section>
      </main>
    </div>
    );
  }