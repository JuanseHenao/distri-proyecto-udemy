import React from "react";
import "tailwindcss/tailwind.css";
import client from "../contentful";
import Navbar from "@/app/components/navbar/Navbar";
import MyCourses from "@/app/components/MyCourses";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import Footer from "@/app/components/Footer";
import axios from "axios";

export async function getServerSideProps() {
  const entries = await client.getEntries({
    content_type: "course",
  });

  let reviews = [];
  await axios
    .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews")
    .then((response) => {
      reviews = response.data;
    })
    .catch((error) => {
      console.error("Error al obtener las calificaciones:", error);
    });

  return {
    props: {
      entries: entries.items,
      reviews: reviews,
    },
  };
}

export default function Home({ entries, session, reviews }) {
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
      <main className="flex flex-col w-full">
        <SessionProvider session={session}>
          <Navbar />
          <div className="w-full p-10 font-serif text-4xl font-semibold text-white bg-black">
            My Learning
          </div>
          <MyCourses courses={entries} allReviews={reviews} />
          <Footer />
        </SessionProvider>
      </main>
    </>
  );
}
