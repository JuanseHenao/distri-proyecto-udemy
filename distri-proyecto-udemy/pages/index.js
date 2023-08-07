"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import client from "../contentful";
import Navbar from "@/app/components/navbar/Navbar";
import SliderMain from "@/app/components/SliderMain";
import Courses from "@/app/components/Courses";
import { SessionProvider } from "next-auth/react";
import Footer from "@/app/components/Footer";

export async function getStaticProps() {
  const entries = await client.getEntries({
    content_type: "course",
  });

  return {
    props: {
      entries: entries.items,
    },
  };
}

export default function Home({ entries, session }) {
  const images = ["/a.jpg", "b.jpg"];

  return (
    <main className="w-[100%]">
      <SessionProvider session={session}>
        <Navbar />
        <SliderMain images={images} />
        <div className="flex justify-center my-5">
          <div className="space-y-3 text-center">
            <div className="text-lg text-gray-600">
              Más de 14.400 empresas y millones de estudiantes de todo el mundo
              confían en nosotros
            </div>
            <div className="flex flex-wrap justify-between space-x-16 space-y-5">
              <img src="volkswagen.svg" className="" />
              <img src="samsung.svg" className="" />
              <img src="cisco.svg" className="" />
              <img src="att.svg" className="" />
              <img src="procter_gamble.svg" className="" />
              <img src="hewlett_packard_enterprise.svg" className="" />
              <img src="citi.svg" className="" />
              <img src="ericsson.svg" className="" />
            </div>
          </div>
        </div>
        <Courses courses={entries} />
        <Footer />
      </SessionProvider>
    </main>
  );
}
