import React from "react";

export default function Hero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="w-full py-6 bg-blue-600 text-white text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-lg">{subtitle}</p>
    </header>
  );
}
