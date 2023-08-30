import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactStars from "react-stars";

export default function MyCourseComponent({ data }) {
  const router = useRouter();

  const courseId = data.sys.id;
  return (
    <>
      <div
        className="pt-4 mb-3 cursor-pointer hover:opacity-80"
        onClick={() => router.push(`/course/${courseId}`)}
      >
        <div className="flex flex-col items-center md:pb-6 md:border-b md:flex-row md:justify-start">
          <Image
            width={200}
            height={200}
            src={"https:" + data.fields.preview.fields.file.url}
            alt="Image"
            className="object-cover w-[300px] h-[150px]"
          />

          <div className="mx-6 w-[300px] h-[150px] md:h-auto md:w-auto border-b pb-6 md:border-b-0 md:pb-0">
            <h3 className="text-[20px] font-bold">{data.fields.title}</h3>
            <span className="text-gray-400 block text-[12px] font-normal">
              {data.fields.author}
            </span>
            <ReactStars
              count={5}
              size={23}
              color2={"#ffd700"}
              value={4}
              edit={false}
            />
            <span className="text-black">$ {data?.fields?.price}</span>
          </div>
        </div>
      </div>
    </>
  );
}
