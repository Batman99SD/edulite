import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, courseId } = req.body;

    // Log incoming request body
    console.log("Incoming Request Body:", req.body);

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'Missing userId or courseId' });
    }

    try {

      // Check if the user is already enrolled in the course
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: { userId: parseInt(userId), courseId: parseInt(courseId) },
        },
      });

      if (existingEnrollment) {
        return res.status(400).json({ error: 'User is already enrolled in this course.' });
      }

      const enrollment = await prisma.enrollment.create({
        data: {
          userId: parseInt(userId),
          courseId: parseInt(courseId),
          // enrolled: true, // Set enrolled to true
        },
      });

      console.log("Enrollment created:", enrollment);
      return res.status(201).json({ success: true, enrollment });
    } catch (error) {
      console.error('Error enrolling user:', error);
      return res.status(500).json({ error: 'Failed to enroll user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}