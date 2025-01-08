import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../lib/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // 📚 POST: Enroll a user in a course
    case 'POST':
      return authenticateToken(req, res, async () => {
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
          return res.status(400).json({ error: 'User ID and Course ID are required' });
        }

        try {
          // Check if the enrollment already exists
          const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId: parseInt(userId),
                courseId: parseInt(courseId),
              },
            },
          });

          if (existingEnrollment) {
            return res.status(400).json({ error: 'User is already enrolled in this course' });
          }

          // Create a new enrollment
          const enrollment = await prisma.enrollment.create({
            data: {
              userId: parseInt(userId),
              courseId: parseInt(courseId),
            },
          });

          return res.status(201).json({ message: 'Enrollment successful', enrollment });
        } catch (error) {
          console.error('Error enrolling user:', error);
          return res.status(400).json({ error: 'Failed to enroll user' });
        }
      });

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
