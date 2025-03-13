import { color3 } from "./colors";
import Entry from "./Entry";

const CourseRoot = ({ courseName, courses, onDeleteEntry }) => {
  return (
    <div
      style={{
        background: color3,
      }}
    >
      {courses.map((course, index) => (
        <Entry
          courseName={courseName}
          status={course.status}
          date={course.date}
          onDeleteEntry={onDeleteEntry}
        />
      ))}
    </div>
  );
};

export default CourseRoot;
