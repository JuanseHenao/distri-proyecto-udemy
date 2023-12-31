import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

export default function ActionButtons({
  buyCourse,
  course,
  rateCourse,
  refreshData,
}) {
  const { data: session } = useSession();

  const [purchasesData, setPurchasesData] = useState([]);
  const [allUserReviews, setAllUserReviews] = useState([]);

  const ejemplo = [
    {
      user_token: "1234567890",
      course_cms_id: "7vJhjZO9cjQejJRaRbrRfO",
    },
    {
      user_token: "1234567890",
      course_cms_id: "valor_del_curso_2",
    },
    {
      user_token: "1234567890",
      course_cms_id: "valor_del_curso_3",
    },
  ];

  const ejemplo2 = [
    {
      user_token: "1234567890",
      cms_id: "7vJhjZO9cjQejJRaRbrRfO",
      review_score: 4.5,
    },
    {
      user_token: "1234567890",
      cms_id: "valor_del_curso_2",
      review_score: 3.8,
    },
    {
      user_token: "1234567890",
      cms_id: "valor_del_curso_3",
      review_score: 5.0,
    },
  ];

  useEffect(() => {
    setPurchasesData(ejemplo);
    setAllUserReviews(ejemplo2);
    if (session != null) {
      getData(session);
    }
  }, [session, refreshData]);

  const getData = async (sessionInfo) => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/customer/" +
          sessionInfo.user.email +
          "/purchases"
      )
      .then((response) => {
        setPurchasesData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las compras:", error);
      });
    // Get All User Reviews
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/customer/" +
          sessionInfo.user.email +
          "/reviews"
      )
      .then((response) => {
        setAllUserReviews(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las calificaciones:", error);
      });
  };

  const hasCourse = () => {
    return session
      ? purchasesData.some((item) => item.course_cms_id == course.sys.id)
      : false;
  };

  const hasRatedCourse = () => {
    return session && hasCourse()
      ? allUserReviews.some((item) => item.cms_id == course.sys.id)
      : false;
  };

  return (
    <>
      {!hasCourse() && (
        <button
          className="w-full py-3 font-bold text-black border border-black cursor-pointer border-3"
          onClick={() => (session != null ? buyCourse(session) : signIn())}
        >
          Comprar ahora
        </button>
      )}
      {hasCourse() && !hasRatedCourse() && (
        <div>
          <div className="flex items-center my-3 space-x-3">
            <div>
              <FaCheck className="text-green-700 text-md" />
            </div>
            <div>Ya tienes este curso</div>
          </div>
          <button
            className="w-full py-3 font-bold text-black border border-black cursor-pointer border-3"
            onClick={() => (session != null ? rateCourse(session) : signIn())}
          >
            Calificar este curso
          </button>
        </div>
      )}
      {hasCourse() && hasRatedCourse() && (
        <div className="flex items-center my-3 space-x-3">
          <div>
            <FaCheck className="text-green-700 text-md" />
          </div>
          <div>Ya tienes este curso y ya fue calificado</div>
        </div>
      )}
    </>
  );
}
