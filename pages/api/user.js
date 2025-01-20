import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../lib/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return authenticateToken(req, res, async () => {
        const userId = req.user.id; // Get user ID from token

        try {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true },
          });

          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          res.status(200).json(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ error: 'Failed to fetch user' });
        }
      });

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
