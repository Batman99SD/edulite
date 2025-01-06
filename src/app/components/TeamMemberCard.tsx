import React from "react";
import Image from "next/image";

export default function TeamMemberCard({
  photo,
  name,
  role,
}: {
  photo: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={photo}
        alt={name}
        width={120}
        height={120}
        className="rounded-full"
      />
      <h3 className="text-xl font-bold text-gray-700 mt-4">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
