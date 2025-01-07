'use client';
import { useState } from 'react';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    instructor: '',
    videoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Course added successfully');
      } else {
        alert('Failed to add course');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard - Add Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
        <input
          name="videoUrl"
          placeholder="YouTube Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}
