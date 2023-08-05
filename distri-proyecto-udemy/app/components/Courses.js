import client from "../../contentful";
import CourseComponent from "./CourseComponent";

export async function getStaticProps() {
  const courses = await client.getEntries({
    content_type: "course",
  });

  console.log("HOLA");

  return {
    props: {
      courses: courses.items,
    },
  };
}

export default function Courses({ courses }) {
  return (
    <div className="flex flex-wrap w-full h-48 px-8 text-black bg-white">
      {courses?.map((item) => (
        <div>
          fdjfbhdjkslbn
          <CourseComponent key={item.id} data={item} currentUser={user} />
        </div>
      ))}
    </div>
  );
}
