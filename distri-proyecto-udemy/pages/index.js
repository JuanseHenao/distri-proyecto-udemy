import React from "react";
import "tailwindcss/tailwind.css";
import client from "../contentful";
import Navbar from "@/app/components/navbar/Navbar";
import SliderMain from "@/app/components/SliderMain";
import Courses from "@/app/components/Courses";

export async function getStaticProps() {
  const entries = await client.getEntries({
    content_type: "course",
  });

  console.log(entries);

  return {
    props: {
      entries: entries.items,
    },
  };
}

export default function Home({ entries }) {
  const images = ["/a.jpg", "b.jpg"];

  console.log(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);

  return (
    <main className="w-[100%]">
      <Navbar />
      <SliderMain images={images} />
      <Courses courses={entries} />
    </main>
  );
}
