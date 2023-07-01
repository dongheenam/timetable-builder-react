import ButtonIcon from '@/components/ButtonIcon';
import Editable from '@/components/Editable';
import { CourseArray } from '@/types';
import { IconX } from '@tabler/icons-react';

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
  courses: CourseArray;
  updateCourse: (
    code: string
  ) => (courseData: Partial<CourseArray[number]>) => void;
  deleteCourse: (code: string) => void;
};
export default function CoursesTable({
  courses,
  updateCourse,
  deleteCourse,
}: Props) {
  const headers = COLUMNS.map((column) => column.header);
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseRow
            key={course.code}
            course={course}
            update={updateCourse(course.code)}
            remove={() => deleteCourse(course.code)}
          />
        ))}
      </tbody>
    </table>
  );
}

type CourseRowProps = {
  course: CourseArray[number];
  update: (
    courseData: Partial<Pick<CourseArray[number], 'code' | 'staffCode'>>
  ) => void;
  remove: () => void;
};
function CourseRow({ course, update, remove }: CourseRowProps) {
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
              setValue={(value: string) => update({ [column.key]: value })}
            />
          ) : (
            <span>{courseData[column.key]}</span>
          )}
        </td>
      ))}
      <td>
        <ButtonIcon
          label={`delete course ${course.code}`}
          onClick={remove}
          icon={<IconX />}
        />
      </td>
    </tr>
  );
}
