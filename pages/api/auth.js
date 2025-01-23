// pages/api/auth.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { name, email, password } = req.body;
    console.log('Request Body:', { name, email, password });

    if (req.query.action === 'register') {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        console.log('User created:', user);

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated Token:", token);
        console.log("User Data in Token:", { userId: user.id });
        res.status(201).json({ message: 'User registered successfully', user, token });
      } catch (error) {
        console.error('Registration Error:', error.message);
        console.error('Registration Error:', error);
        res.status(400).json({ error: 'User already exists or registration failed' });
      }
    }

    if (req.query.action === 'login') {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log("User during login:", user);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });

        res.status(200).json({ token, user });
      } catch (error) {
        console.error('Login Error:', error);
        res.status(400).json({ error: 'Login failed' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}