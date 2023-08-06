"use client";

import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function SliderMain({ images = [] }) {
  const [current, setCurrent] = useState(0);

  const currentImage = images[current];

  const prevImage = () => {
    const isFirstSlide = current === 0;
    const newIndex = isFirstSlide ? images.length - 1 : current - 1;
    setCurrent(newIndex);
  };

  const nextImage = () => {
    const isLastSlide = current === images.length - 1;
    const newIndex = isLastSlide ? 0 : current + 1;
    setCurrent(newIndex);
  };

  return (
    <div className="relative text-black">
      <div>
        <button
          onClick={prevImage}
          className="absolute left-[2%] top-[50%] z-[40]"
        >
          <BsArrowLeft />
        </button>
        <img
          src={currentImage}
          alt={`Image ${current + 1}`}
          className="h-[500px] object-cover w-full"
        />
        {current === 1 && (
          <div className="absolute top-[20%] left-[5%] bg-white p-6 max-w-[450px]">
            <h1 className="my-4 text-[2rem] font-bold">
              Un aprendizaje interesante
            </h1>
            <h4 className="text-[1.2rem]">
              Habilidades para tu presente (y tu futuro). Da tus primeros pasos
              con nosotros.
            </h4>
          </div>
        )}

        {current === 0 && (
          <div className="absolute top-[20%] left-[5%] bg-white p-6 max-w-[450px]">
            <h1 className="my-4 text-[2rem] font-bold">
              Crea equipos preparados para todo
            </h1>
            <h4 className="text-[1.2rem]">
              Descubre por qué las empresas líderes deciden aprender con Udemy
              Business.
            </h4>
          </div>
        )}

        <button
          onClick={nextImage}
          className="absolute right-[2%] top-[50%] z-[40]"
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
}
