import Editable from '@/components/Editable';
import { CourseArray } from '@/types';

// to avoid Typescript error when accessing courseData using the keys
type KEY = 'code' | 'lessons' | 'staffCode';
const COLUMNS: { key: KEY; [k: string]: any }[] = [
  {
    header: 'Class',
    key: 'code',
    placeholder: 'class code',
    editable: true,
  },
  {
    header: '#',
    key: 'lessons',
    editable: false,
  },
  {
    header: 'Staff',
    key: 'staffCode',
    placeholder: 'class code',
    editable: true,
  },
];

type Props = {
  group: string | undefined;
  courses: CourseArray;
};
export default function CoursesTable({ group, courses }: Props) {
  const headers = COLUMNS.map((column) => column.header);
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseRow key={course.code} course={course} />
        ))}
      </tbody>
    </table>
  );
}

function CourseRow({ course }: { course: CourseArray[number] }) {
  const courseData = {
    code: course.code,
    lessons: course.lessons.length,
    staffCode: course.staffCode,
  };

  return (
    <tr>
      {COLUMNS.map((column) => (
        <td key={column.key}>
          {column.editable ? (
            <Editable
              value={courseData[column.key].toString()}
              setValue={(_text: string) => {}}
            />
          ) : (
            courseData[column.key]
          )}
        </td>
      ))}
    </tr>
  );
}
