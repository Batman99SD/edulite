import React from "react";

export default function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold text-blue-600">{number}</h3>
      <p className="text-lg text-gray-600">{label}</p>
    </div>
  );
}
