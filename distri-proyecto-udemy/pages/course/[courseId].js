import Navbar from "@/app/components/navbar/Navbar";
import "tailwindcss/tailwind.css";
import client from "../../contentful";
import Image from "next/image";
import Provider from "@/app/components/Provider";
import Footer from "@/app/components/Footer";

export async function getStaticPaths() {
  try {
    const response = await client.getEntries({
      content_type: "course", // Cambia por el tipo correcto en Contentful
    });

    const paths = response.items.map((item) => ({
      params: { courseId: item.sys.id }, // Cambia por el nombre del campo de slug en Contentful
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching Contentful entries:", error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  const courseId = params.courseId;

  try {
    const entry = await client.getEntry(courseId);

    return {
      props: {
        entry,
      },
    };
  } catch (error) {
    console.error("Error fetching Contentful entry:", error);
    return {
      props: {
        entry: null,
      },
    };
  }
}

export default function IndividualCourse({ entry }) {
  return (
    <Provider>
      <Navbar />
      <div className="relative">
        <div className="absolute p-1 mt-10 ml-10 text-black bg-white shadow-md right-10 w-fit min-w-fit">
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
            <button className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900">
              Añadir a la cesta
            </button>
            <button className="w-full py-3 font-bold text-black border border-black cursor-pointer border-3">
              Comprar ahora
            </button>
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
          <div className="flex justify-start w-4/5 m-6 mx-20 mt-10">
            <div className="flex flex-col w-2/5 mb-6 mr-10 space-y-3 lg:w-2/3">
              <div className="text-3xl font-bold">{entry.fields.title}</div>
              <div className="text-lg">{entry.fields.description}</div>
              <div className="text-md">
                Creado por
                <span className="font-bold">{" " + entry.fields.author}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full text-black">
          <div className="flex flex-col justify-start w-4/5 m-6 mx-20 mt-10">
            <div className="flex flex-col w-2/5 p-3 px-8 mb-6 mr-10 space-y-3 border border-gray-300 lg:w-2/3 border-spacing-5 border-3">
              <div className="w-full text-2xl font-bold">Lo que aprenderas</div>
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
            <div className="flex flex-col w-2/5 p-3 px-8 mb-6 mr-10 space-y-3 text-gray-600 border border-gray-300 lg:w-2/3 border-spacing-5 border-3">
              <div className="w-full font-bold text-">
                Las principales empresas ofrecen este curso a sus empleados.
              </div>
              <div className="w-full text-md">
                Este curso fue seleccionado para nuestra colección de cursos
                mejor calificados en los que confían empresas de todo el mundo.
                Más información
              </div>
              <div className="flex flex-wrap justify-between space-x-16 space-y-5">
                <img src="/nasdaq-dark.svg" className="" />
                <img src="/volkswagen.svg" className="" />
                <img src="/box-dark.svg" className="" />
                <img src="/netapp-dark.svg" className="" />
                <img src="/eventbrite-dark.svg" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Provider>
  );
}
