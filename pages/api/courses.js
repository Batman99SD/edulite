import { PrismaClient } from '@prisma/client'; // Import Prisma for database connection
import { authenticateToken } from '../../lib/authMiddleware'; // Middleware to secure admin actions

const prisma = new PrismaClient(); // Create a Prisma client instance

// ✅ MAIN API HANDLER FUNCTION
export default async function handler(req, res) {
  const { method, query } = req; // Extract HTTP method and query parameters

  switch (method) {
    // 🚀 GET: FETCH COURSES
    case 'GET':
      try {
        if (query.id) {
          // Fetch a specific course by ID
          const course = await prisma.course.findUnique({
            where: { id: parseInt(query.id) },
          });

          if (!course) {
            return res.status(404).json({ error: 'Course not found' });
          }

          // Fetch YouTube Details
          const enrichedCourse = await enrichCourseWithYouTube(course);
          return res.status(200).json(enrichedCourse);
        } else {
          // Fetch all courses
          const courses = await prisma.course.findMany();
          const enrichedCourses = await Promise.all(
            courses.map((course) => enrichCourseWithYouTube(course))
          );

          return res.status(200).json(enrichedCourses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        return res.status(500).json({ error: 'Failed to fetch courses' });
      }

    // 📝 POST: CREATE A NEW COURSE (Admin Only)
    case 'POST':
      return authenticateToken(req, res, async () => {
        const { title, description, instructor, videoUrl } = req.body;

        if (!title || !description || !instructor || !videoUrl) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        try {
          const course = await prisma.course.create({
            data: {
              title,
              description,
              instructor,
              videoUrl,
            },
          });
          return res.status(201).json(course);
        } catch (error) {
          console.error('Error creating course:', error);
          return res.status(400).json({ error: 'Failed to create course' });
        }
      });

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// ✅ FUNCTION TO FETCH YOUTUBE DETAILS
async function enrichCourseWithYouTube(course) {
  const youtubeAPIKey = process.env.YOUTUBE_API_KEY;

  if (course.videoUrl) {
    const videoId = extractVideoId(course.videoUrl);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeAPIKey}&part=snippet,contentDetails,statistics`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const videoDetails = data.items[0].snippet;
        return {
          ...course,
          videoTitle: videoDetails.title,
          videoThumbnail: videoDetails.thumbnails.high.url,
          videoDescription: videoDetails.description,
        };
      }
    } catch (error) {
      console.error('Failed to fetch YouTube details:', error);
    }
  }

  return course;
}

// ✅ FUNCTION TO EXTRACT VIDEO ID FROM YOUTUBE URL
function extractVideoId(url) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}
