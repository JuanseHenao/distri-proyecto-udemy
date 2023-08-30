import Navbar from "@/app/components/navbar/Navbar";
import "tailwindcss/tailwind.css";
import client from "../../contentful";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import ReactStars from "react-stars";
import React, { useState } from "react";
import PurchaseModal from "../../app/components/PurchaseModal";
import ActionButtons from "@/app/components/ActionButtons";
import RateModal from "@/app/components/RateModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export async function getServerSideProps(context) {
  const { params } = context;
  const courseId = params.courseId;

  const entry = await client.getEntry(courseId);

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
      reviews: reviews,
      entry: entry,
    },
  };
}

export default function IndividualCourse({ entry, session, reviews }) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const buyCourse = () => {
    setIsPurchaseModalOpen(true);
  };

  const rateCourse = () => {
    setIsRatingModalOpen(true);
  };

  const openPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const openRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

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
      <SessionProvider session={session}>
        <Navbar />
        <div className="relative">
          <div className="absolute hidden p-1 mt-10 ml-10 text-black bg-white shadow-md right-10 w-fit min-w-fit md:block">
            <Image
              width={250}
              height={250}
              src={"https:" + entry.fields.preview.fields.file.url}
              alt="Image"
              className="object-cover w-[320px] h-[150px]"
            />
            <h1 className="p-3 text-4xl font-semibold">
              {entry.fields.price} COL$
            </h1>
            <div className="p-3 space-y-3">
              {/* <button className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900">
                Añadir a la cesta
              </button> */}
              <ActionButtons
                buyCourse={buyCourse}
                course={entry}
                rateCourse={rateCourse}
              />
              <div className="text-xs text-center">
                Garantía de reembolso de 30 días
              </div>
              <div className="mt-5 font-bold text-md">Este curso incluye:</div>
              <ul className="ml-5 space-y-2 text-gray-600 list-disc">
                <li>54 horas de vídeo bajo demanda</li>
                <li>66 artículos</li>
                <li>15 recursos descargables</li>
                <li>Acceso en dispositivos móviles y TV</li>
                <li>Acceso de por vida</li>
                <li>Certificado de finalización</li>
              </ul>
              <div className="flex justify-between px-4 mt-2 font-bold underline">
                <div>Compartir</div>
                <div>Regalar este curso</div>
              </div>
              <div className="px-4 font-bold text-center underline">
                Aplicar cupón
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full text-white bg-black">
            <div className="flex justify-start m-6 mx-20 mt-10 md:w-4/5">
              <div className="flex flex-col mb-6 space-y-3 md:mr-10 md:w-2/5 lg:w-2/3">
                <div className="text-3xl font-bold">{entry.fields.title}</div>
                <div className="text-lg">{entry.fields.description}</div>
                <ReactStars
                  count={5}
                  size={23}
                  color2={"#ffd700"}
                  value={
                    reviews?.find(
                      (review) => review.course_cms_id === entry.sys.id
                    )?.review_score || 0
                  }
                  edit={false}
                />
                <div className="text-md">
                  Creado por
                  <span className="font-bold">{" " + entry.fields.author}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-1 mt-10 text-black bg-white shadow-md md:hidden">
            <Image
              width={250}
              height={250}
              src={"https:" + entry.fields.preview.fields.file.url}
              alt="Image"
              className="object-cover w-[320px] h-[150px]"
            />
            <h1 className="p-3 text-4xl font-semibold">
              {entry.fields.price} COL$
            </h1>
            <div className="p-3 space-y-3">
              {/* <button className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900">
                Añadir a la cesta
              </button> */}
              <ActionButtons
                buyCourse={buyCourse}
                course={entry}
                rateCourse={rateCourse}
              />
              <div className="text-xs text-center">
                Garantía de reembolso de 30 días
              </div>
              <div className="mt-5 font-bold text-md">Este curso incluye:</div>
              <ul className="ml-5 space-y-2 text-gray-600 list-disc">
                <li>54 horas de vídeo bajo demanda</li>
                <li>66 artículos</li>
                <li>15 recursos descargables</li>
                <li>Acceso en dispositivos móviles y TV</li>
                <li>Acceso de por vida</li>
                <li>Certificado de finalización</li>
              </ul>
              <div className="flex justify-between px-4 mt-2 font-bold underline">
                <div>Compartir</div>
                <div>Regalar este curso</div>
              </div>
              <div className="px-4 font-bold text-center underline">
                Aplicar cupón
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full text-black">
            <div className="flex flex-col justify-start m-6 mx-6 mt-10 md:mx-20 md:w-4/5">
              <div className="flex flex-col p-3 px-8 mb-6 space-y-3 border border-gray-300 md:mr-10 md:w-2/5 lg:w-2/3 border-spacing-5 border-3">
                <div className="w-full text-2xl font-bold">
                  Lo que aprenderas
                </div>
                <div className="justify-between text-gray-600 lg:space-x-8 lg:flex">
                  <div className="text-md">
                    <ul className="space-y-3 list-disc">
                      <li>Aprender React a profundidad</li>
                      <li>MERN - Mongo Express React Node</li>
                      <li>Hooks a profundidad</li>
                      <li>Redux, Context y otros manejadores de estado</li>
                    </ul>
                  </div>
                  <div className="text-md">
                    <ul className="space-y-3 list-disc">
                      <li>Aprender React a profundidad</li>
                      <li>MERN - Mongo Express React Node</li>
                      <li>Hooks a profundidad</li>
                      <li>Redux, Context y otros manejadores de estado</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-3 px-8 mb-6 space-y-3 text-gray-600 border border-gray-300 md:w-2/5 md:mr-10 lg:w-2/3 border-spacing-5 border-3">
                <div className="w-full font-bold text-">
                  Las principales empresas ofrecen este curso a sus empleados.
                </div>
                <div className="w-full text-md">
                  Este curso fue seleccionado para nuestra colección de cursos
                  mejor calificados en los que confían empresas de todo el
                  mundo. Más información
                </div>
                <div className="flex flex-wrap justify-between space-x-16 space-y-5">
                  <img
                    src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/nasdaq-dark.svg"
                    className=""
                  />
                  <img
                    src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/volkswagen.svg"
                    className=""
                  />
                  <img
                    src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/box-dark.svg"
                    className=""
                  />
                  <img
                    src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/netapp-dark.svg"
                    className=""
                  />
                  <img
                    src="https://udemybucketeia.s3.sa-east-1.amazonaws.com/static/eventbrite-dark.svg"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={closePurchaseModal}
          course={entry}
          session={session}
        />
        <RateModal
          isOpen={isRatingModalOpen}
          onClose={closeRatingModal}
          course={entry}
        />
        <ToastContainer position="bottom-right" />
      </SessionProvider>
    </>
  );
}
