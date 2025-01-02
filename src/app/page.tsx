'use client';

import Image from "next/image";
import Link from "next/link";
import CourseCard from "./CourseCard";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Welcome to Edulite</h1>
        <p className="mt-2 text-lg">Your gateway to quality online education</p>
      </header>
      <main className="flex flex-col items-center py-10 px-4 sm:px-20">
      <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Why Choose Edulite?</h2>
          <p className="text-lg text-gray-700">Interactive courses, expert instructors, and flexible learning options.</p>
        </section>
        <section className="flex flex-wrap justify-center gap-8 mb-10">
        <CourseCard
            imageSrc="/course1.jpg"
            title="Course Title 1"
            description="Brief description of the course."
            link="/course/1"
          />
          <CourseCard
            imageSrc="/course2.jpg"
            title="Course Title 2"
            description="Brief description of the course."
            link="/course/2"
          />
          <CourseCard
            imageSrc="/course3.jpg"
            title="Course Title 3"
            description="Brief description of the course."
            link="/course/3"
          />
          </section>
        <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">What Our Students Say</h2>
          <p className="text-lg text-gray-700">Read testimonials from our satisfied learners.</p>
        </section>
        

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link href="/login">
            
        <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">Login</span>
          </Link>
          <Link href="/signup">
            
          <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">Signup</span>
           
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}