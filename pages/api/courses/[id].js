import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const course = await prisma.course.findUnique({
        where: { id: parseInt(id) },
        include: { Enrollments: true }, // Include related data if needed
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      return res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ error: "Failed to fetch course" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}