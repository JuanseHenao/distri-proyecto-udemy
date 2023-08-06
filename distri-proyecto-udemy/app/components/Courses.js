import CourseComponent from "./CourseComponent";

export default function Courses({ courses = [] }) {
  return (
    <div>
      <div className="pt-10 pl-10 font-serif text-3xl">Empieza a aprender</div>
      <div className="pl-10 text-xl -pt-5">
        {courses.length + " cursos disponibles"}
      </div>
      <div className="flex flex-wrap w-full h-48 px-8 text-black bg-white">
        {courses?.map((item, key) => (
          <CourseComponent key={key} data={item} currentUser={null} />
        ))}
      </div>
    </div>
  );
}
