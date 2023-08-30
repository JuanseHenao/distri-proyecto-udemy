import CourseComponent from "./CourseComponent";

export default function Courses({ courses = [], allReviews = [] }) {
  return (
    <div className="flex flex-col mb-5 bg-red">
      <div className="pt-10 pl-10 font-serif text-3xl">Empieza a aprender</div>
      <div className="pl-10 text-xl -pt-5">
        {courses?.length + " cursos disponibles"}
      </div>
      <div className="flex flex-wrap justify-center w-full h-full px-8 text-black bg-white lg:justify-start">
        {courses?.map((item, key) => (
          <CourseComponent
            key={key}
            data={item}
            currentUser={null}
            review={
              allReviews?.find((review) => review.course_cms_id === item.sys.id)
                ?.review_score || 0
            }
          />
        ))}
      </div>
    </div>
  );
}
