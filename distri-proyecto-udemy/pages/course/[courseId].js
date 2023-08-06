import Navbar from "@/app/components/navbar/Navbar";
import "tailwindcss/tailwind.css";
import client from "../../contentful";
import Image from "next/image";

export async function getStaticPaths() {
  try {
    const response = await client.getEntries({
      content_type: "course", // Cambia por el tipo correcto en Contentful
    });

    console.log(response);
    const paths = response.items.map((item) => ({
      params: { courseId: item.sys.id }, // Cambia por el nombre del campo de slug en Contentful
    }));

    console.log(paths);

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
    <div>
      <Navbar />
      <div className="relative">
        <div className="flex justify-center w-full text-white bg-black">
          <div className="flex justify-start m-6 mx-20 mt-10">
            <div className="flex flex-col w-2/5 mb-6 mr-10 space-y-3 lg:w-2/3">
              <div className="text-3xl font-bold">{entry.fields.title}</div>
              <div className="text-lg">{entry.fields.description}</div>
              <div className="text-md">
                Created by
                <span className="font-bold">{" " + entry.fields.author}</span>
              </div>
            </div>
            <div className="absolute p-1 ml-10 text-black bg-white shadow-md right-10 w-fit min-w-fit">
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
              <div className="p-3">
                <button
                  onClick={() => console.log("CARECHIMBA")}
                  className="w-full py-3 font-bold text-white bg-purple-500 cursor-pointer hover:bg-purple-900"
                >
                  Añadir a la cesta
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full text-black ">
          <div className="flex justify-start w-full m-6 mx-20">
            <div className="flex flex-col justify-start w-2/5 p-5 space-y-3 border lg:ml-16 lg:w-2/3">
              <div className="w-full text-2xl font-bold">Lo que aprenderas</div>
              <div className="flex space-x-10">
                <div className="text-md">
                  <ul className="list-disc">
                    <li>Aprender React a profundidad</li>
                    <li>MERN - Mongo Express React Node</li>
                    <li>Hooks a profundidad</li>
                    <li>Redux, Context y otros manejadores de estado</li>
                  </ul>
                </div>
                <div className="text-md">
                  <ul className="list-disc">
                    <li>Aprender React a profundidad</li>
                    <li>MERN - Mongo Express React Node</li>
                    <li>Hooks a profundidad</li>
                    <li>Redux, Context y otros manejadores de estado</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
}
