"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import client from "../contentful";
import Navbar from "@/app/components/navbar/Navbar";
import SliderMain from "@/app/components/SliderMain";
import Courses from "@/app/components/Courses";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
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
  const images = [
    "https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/a.jpg",
    "https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/b.jpg",
  ];

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <main className="w-[100%]">
        <SessionProvider session={session}>
          <Navbar />
          <SliderMain images={images} />
          <div className="flex justify-center my-5">
            <div className="space-y-3 text-center">
              <div className="text-lg text-gray-600">
                Más de 14.400 empresas y millones de estudiantes de todo el
                mundo confían en nosotros
              </div>
              <div className="flex flex-wrap justify-between space-x-16 space-y-5">
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/volkswagen.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/samsung.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/cisco.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/att.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/procter_gamble.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/hewlett_packard_enterprise.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/citi.svg"
                  className=""
                />
                <img
                  src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/ericsson.svg"
                  className=""
                />
              </div>
            </div>
          </div>
          <Courses courses={entries} />
          <Footer />
        </SessionProvider>
      </main>
    </>
  );
}
