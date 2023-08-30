import MyCourseComponent from "./MyCourseComponent";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import axios, { all } from "axios";

export default function MyCourses({ courses = [], allReviews = [] }) {
  const { data: session } = useSession();

  const [allCourses, setAllCourses] = useState(courses);

  const [purchasesData, setPurchasesData] = useState([]);

  const ejemplo = [
    {
      user_token: "1234567890",
      course_cms_id: "7vJhjZO9cjQejJRaRbrRfO",
      price: 49.99,
      purchase_date: "2023-08-27",
    },
    {
      user_token: "1234567890",
      course_cms_id: "valor_del_curso_2",
      price: 29.99,
      purchase_date: "2023-08-26",
    },
    {
      user_token: "1234567890",
      course_cms_id: "valor_del_curso_3",
      price: 19.99,
      purchase_date: "2023-08-25",
    },
  ];

  useEffect(() => {
    setPurchasesData(ejemplo);
    if (session != null) {
      //Get All User Purchases
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/customer/" +
            session.user.email +
            "/purchases"
        )
        .then((response) => {
          setPurchasesData(response.data);
          courses = courses.filter((curso) =>
            purchasesData.some(
              (purchasesItem) => purchasesItem.course_cms_id === curso.sys.id
            )
          );
        })
        .catch((error) => {
          console.error("Error al obtener las calificaciones:", error);
        });
    }
    setAllCourses(
      courses.filter((curso) =>
        purchasesData.some(
          (purchasesItem) => purchasesItem.course_cms_id === curso.sys.id
        )
      )
    );
  }, [session]);

  return (
    <>
      {session && (
        <div className="flex flex-col bg-red">
          <div className="pt-10 pl-10 font-serif text-3xl">
            Continua aprendiendo
          </div>
          <div className="pl-10 text-xl -pt-5">
            {allCourses?.length + " cursos adquirido(s)"}
          </div>
          <div className="flex flex-col justify-start w-full h-full px-8 overflow-scroll text-black bg-white lg:justify-start max-h-[700px] overflow-x-hidden my-5 pr-4 min-h-[500px]">
            {allCourses?.map((item, key) => (
              <MyCourseComponent
                key={key}
                data={item}
                currentUser={null}
                review={
                  allReviews?.find(
                    (review) => review.course_cms_id === item.sys.id
                  )?.review_score || 0
                }
              />
            ))}
          </div>
        </div>
      )}
      {!session && (
        <div className="flex flex-col items-center justify-center w-full h-screen space-y-5 -my-44">
          <div className="font-serif text-lg">
            Necesitas Iniciar sesión para visualizar tus cursos
          </div>
          <button
            onClick={() => signIn()}
            className="py-2 px-6 border-black border-[1px] text-black font-bold"
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </>
  );
}
