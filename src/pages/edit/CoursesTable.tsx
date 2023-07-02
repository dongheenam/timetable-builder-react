import { useReducer } from 'react';
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react';

import ButtonIcon from '@/components/ButtonIcon';
import LazyInput from '@/components/LazyInput';
import { Course, courseSchema } from '@/types';

// to avoid Typescript error when accessing courseData using the keys
type KEY = 'code' | 'staffCode' | 'actions';
const COLUMNS: { key: KEY; header: string }[] = [
  {
    header: 'Class',
    key: 'code',
  },
  {
    header: 'Staff',
    key: 'staffCode',
  },
  {
    header: 'Actions',
    key: 'actions',
  },
];

type Props = {
  courses: Course[];
  addCourse: (courseData: Partial<Course>) => void;
  updateCourse: (code: string) => (courseUpdate: Partial<Course>) => void;
  removeCourse: (code: string) => void;
  selectCourse: (code: string) => void;
};
export default function CoursesTable({
  courses,
  addCourse,
  updateCourse,
  removeCourse,
  selectCourse,
}: Props) {
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
          <CourseRow
            key={course.code}
            course={course}
            update={updateCourse(course.code)}
            select={() => selectCourse(course.code)}
            remove={() => removeCourse(course.code)}
          />
        ))}
        <EmptyRow create={addCourse} />
      </tbody>
    </table>
  );
}

type CourseRowProps = {
  course: Course;
  update: (courseData: Partial<Pick<Course, 'code' | 'staffCode'>>) => void;
  select: () => void;
  remove: () => void;
};
function CourseRow({ course, update, select, remove }: CourseRowProps) {
  const rowElements = {
    code: (
      <LazyInput
        type="text"
        value={course.code}
        setValue={(value) => update({ code: value })}
      />
    ),
    staffCode: (
      <LazyInput
        type="text"
        value={course.staffCode}
        setValue={(value) => update({ staffCode: value })}
      />
    ),
    actions: (
      <>
        <ButtonIcon
          label={`edit timetable for ${course.code}`}
          onClick={select}
          icon={<IconEdit stroke={1.5} />}
          tabIndex={-1}
        />
        <ButtonIcon
          label={`delete ${course.code}`}
          onClick={remove}
          icon={<IconX stroke={1.5} />}
          tabIndex={-1}
        />
      </>
    ),
  };

  return (
    <tr>
      {COLUMNS.map((column) => (
        <td key={column.key}>{rowElements[column.key]}</td>
      ))}
    </tr>
  );
}

type CourseForm = Pick<Course, 'code' | 'staffCode'>;
type EmptyRowProps = {
  create: (courseData: Partial<Course>) => void;
};
function EmptyRow({ create }: EmptyRowProps) {
  const [courseForm, updateCourseForm] = useReducer(
    (prev: CourseForm, next: Partial<CourseForm>) => ({
      ...prev,
      ...next,
    }),
    {
      code: '',
      staffCode: '',
    }
  );
  const handleSubmit = () => {
    try {
      const formValues = courseSchema
        .pick({ code: true, staffCode: true })
        .parse(courseForm);
      create(formValues);
      updateCourseForm({ code: '', staffCode: '' });
    } catch (error) {
      console.error(error);
    }
  };
  const rowElements = {
    code: (
      <LazyInput
        type="text"
        value={courseForm.code}
        setValue={(value) => updateCourseForm({ code: value })}
      />
    ),
    staffCode: (
      <LazyInput
        type="text"
        value={courseForm.staffCode}
        setValue={(value) => updateCourseForm({ staffCode: value })}
      />
    ),
    actions: (
      <ButtonIcon
        label={`add course`}
        onClick={handleSubmit}
        icon={<IconPlus stroke={1.5} />}
        tabIndex={-1}
      />
    ),
  };
  return (
    <tr>
      {COLUMNS.map((column) => (
        <td key={column.key}>{rowElements[column.key]}</td>
      ))}
    </tr>
  );
}
