interface CourseCardProps {
  course: {
    id: number;
    imageSrc: string;
    title: string;
    category: string;
    description: string;
    duration: string;
    difficulty: string;
    rating: number;
    link: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  console.log(course);
  const {
    imageSrc,
    title,
    category,
    description,
    duration,
    difficulty,
    rating,
    link,
  } = course;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl text-gray-700 font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-sm text-gray-500">
          Duration: {duration} | Difficulty: {difficulty}
        </p>
        <p className="text-sm text-gray-500">Rating: {rating} stars</p>
        <a href={link} className="text-primary text-blue-500">
          Learn More
        </a>
      </div>
    </div>
  );
}
