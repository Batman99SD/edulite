import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'Missing userId or courseId' });
    }

    try {
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });

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