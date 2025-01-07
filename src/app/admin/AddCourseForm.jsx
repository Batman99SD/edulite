'use client';

import { useState } from 'react';

export default function AddCourseForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    videoUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      setMessage('✅ Course added successfully!');
      setFormData({ title: '', description: '', instructor: '', videoUrl: '' });
    } catch (error) {
      setMessage('❌ Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Instructor:</label>
        <input name="instructor" value={formData.instructor} onChange={handleChange} required />
      </div>
      <div>
        <label>Video URL:</label>
        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Course'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}