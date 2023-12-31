//"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactStars from "react-stars";

export default function CourseComponent({ data, review = 0 }) {
  const router = useRouter();

  const courseId = data.sys.id;
  return (
    <div className="pt-4" onClick={() => router.push(`/course/${courseId}`)}>
      <div className="flex flex-col w-[300px] p-2 relative">
        <div className="cursor-pointer hover:opacity-80">
          <div className="border-[4px] border-yellow-400 relative">
            <Image
              width={200}
              height={200}
              src={"https:" + data.fields.preview.fields.file.url}
              alt="Image"
              className="object-cover w-[320px] h-[150px]"
            />
          </div>

          <div className="p-1">
            <h3 className="text-[16px] font-bold">{data.fields.title}</h3>
            <span className="text-gray-400 block text-[12px] font-normal">
              {data.fields.author}
            </span>
            <ReactStars
              count={5}
              size={23}
              color2={"#ffd700"}
              value={review}
              edit={false}
            />
            <span className="text-black">$ {data?.fields?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
