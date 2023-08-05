"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "./components/navbar/Navbar";
import SliderMain from "./components/SliderMain";
import "tailwindcss/tailwind.css";
import Courses from "./components/Courses";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;

  const images = ["/a.jpg", "b.jpg"];

  return (
    <main className="w-[100%]">
      <Navbar />
      <SliderMain images={images} />
      <Courses />
    </main>
  );
}
