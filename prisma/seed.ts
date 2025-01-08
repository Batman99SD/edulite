import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
    {
        id: 1,
        title: "Web Development",
        category: "Technology",
        imageSrc: "/images/wd.png",
        description:
          "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
        duration: "8 weeks",
        difficulty: "Beginner",
        rating: 4.5,
        link: "/courses/1",
        instructor: "John Doe",
        content: [
          "HTML, CSS, and JavaScript basics",
          "Responsive design principles",
          "Introduction to frameworks like React",
        ],
      },
      {
        id: 2,
        title: "Graphic Design",
        category: "Art",
        imageSrc: "/images/gd.jpg",
        description:
          "Explore the principles of graphic design and master tools like Photoshop and Illustrator.",
        duration: "6 weeks",
        difficulty: "Intermediate",
        rating: 4.7,
        link: "/courses/2",
        instructor: "Jane Smith",
        content: [
          "Understanding design principles",
          "Mastering graphic design tools",
          "Creating professional-quality designs",
        ],
      },
      {
        id: 3,
        title: "Data Analysis",
        category: "Data Science",
        imageSrc: "/images/data-analysis-copy.png",
        description:
          "Explore the principles of graphic design and master tools like Photoshop and Illustrator.",
        duration: "6 weeks",
        difficulty: "Intermediate",
        rating: 4.7,
        link: "/courses/2",
        instructor: "Emily Johnson",
        content: [
          "Understanding design principles",
          "Mastering graphic design tools",
          "Creating professional-quality designs",
        ],
      },
    ];

async function main() {
  for (const course of courses) {
    await prisma.course.create({
      data: course,
    });
  }
  console.log("Courses seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });