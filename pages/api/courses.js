import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../lib/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }

  if (method === 'POST') {
    const { title, description, instructor } = req.body;

    try {
      const course = await prisma.course.create({
        data: {
          title,
          description,
          instructor,
        },
      });
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create course' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    authenticateToken(req, res, async () => {
      const { title, description, instructor } = req.body;

      try {
        const course = await prisma.course.create({
          data: {
            title,
            description,
            instructor,
          },
        });
        res.status(201).json(course);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create course' });
      }
    });
  }
}