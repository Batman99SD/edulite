import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

export default function CourseCard({ imageSrc, title, description, link }: CourseCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Image src={imageSrc} alt={title} width={300} height={200} className="rounded-md" />
      <h3 className="text-xl font-semibold mt-4 text-gray-700">{title}</h3>
      <p className="text-gray-800 mt-2">{description}</p>
      <Link href={link}>
        <span className="text-gray-700">
            Learn More
        </span>
      </Link>
    </div>
  );
}