import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const PurchaseModal = ({ isOpen, onClose, course }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const makePurchase = async () => {
    const datos = {
      user_token: session.user.email,
      course_id: course.sys.id,
      purchase_price: course.fields.price,
    };
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/purchases", datos, {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          "Access-Control-Allow-Origin": "http://localhost:3000", // Origen permitido (debe estar configurado en el servidor)
        },
      })
      .then((response) => {
        toast.success("Compra realizada exitosamente");
        console.log("Compra");
        console.log(response);
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error al obtener las calificaciones:", error);
        toast.error("Error realizando la compra");
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>
      <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <div className="px-6 py-4 text-left modal-content">
          <div className="mb-3 font-mono text-3xl font-bold text-center">
            Confirma tu compra
          </div>
          <div className="flex flex-col items-center justify-center mb-3 text-center md:flex-row">
            <Image
              width={100}
              height={100}
              src={"https:" + course.fields.preview.fields.file.url}
              alt="Image"
              className="object-cover w-[200px] h-[100px] rounded-sm shadow-sm"
            />
            <div className="mx-3">
              <div className="text-xl font-semibold">{course.fields.title}</div>
            </div>
          </div>
          <h1 className="justify-center py-3 text-xl font-semibold text-center border shadow-lg">
            {"Total a pagar: " + course.fields.price} COL$
          </h1>
        </div>
        <div className="flex px-6 py-4 space-x-5 modal-footer">
          <button
            className="w-full py-3 font-bold text-black border border-black cursor-pointer border-3"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900"
            onClick={() => makePurchase()}
          >
            {isLoading && (
              <div className="flex items-center justify-center">
                <FaSpinner className="text-lg text-white animate-spin" />
              </div>
            )}
            {!isLoading && <div>Comprar</div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
