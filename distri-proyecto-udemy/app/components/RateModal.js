import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const RateModal = ({
  isOpen,
  onClose,
  course,
  refreshData,
  setRefreshData,
}) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const makeRating = async () => {
    const datos = {
      user_token: session.user.email,
      cms_id: course.sys.id,
      review_score: rating,
    };
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews", datos, {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
        },
      })
      .then((response) => {
        toast.success("Calificación realizada exitosamente");
        setRefreshData(!refreshData);
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error al obtener las calificaciones:", error);
        toast.error("Error realizando la calificación");
      });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
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
          <div className="mb-3 font-mono text-3xl font-bold">
            Califica este curso
          </div>

          <ReactStars
            count={5}
            size={40}
            color2={"#ffd700"}
            value={rating}
            onChange={ratingChanged}
            half={false}
          />
        </div>
        <div className="flex px-6 py-4 space-x-5 modal-footer">
          <button
            disabled={isLoading}
            className="w-full py-3 font-bold text-black border border-black cursor-pointer border-3"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            disabled={isLoading}
            className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900"
            onClick={() => makeRating()}
          >
            {isLoading && (
              <div className="flex items-center justify-center">
                <FaSpinner className="text-lg text-white animate-spin" />
              </div>
            )}
            {!isLoading && <div>Guardar</div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
