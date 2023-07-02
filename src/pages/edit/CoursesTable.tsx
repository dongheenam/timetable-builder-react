import { useReducer } from 'react';
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react';

import ButtonIcon from '@/components/ButtonIcon';
import LazyInput from '@/components/LazyInput';
import { CourseArray, Course } from '@/types';
import { EMPTY_COURSE } from '@/stores';

type Props = {
  courses: CourseArray;
  updateCourse: (code: string) => (courseData: Partial<Course>) => void;
  deleteCourse: (code: string) => void;
  selectCourse: (course: Course) => void;
  createCourse: (courseData: Omit<Course, 'group'>) => void;
};

// to avoid Typescript error when accessing courseData using the keys
type KEY = 'code' | 'lessons' | 'staffCode' | 'actions';
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
    header: 'Lessons',
    key: 'lessons',
  },
  {
    header: 'Actions',
    key: 'actions',
  },
];

export default function CoursesTable({
  courses,
  createCourse,
  updateCourse,
  selectCourse,
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
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseRow
            key={course.code}
            course={course}
            update={updateCourse(course.code)}
            select={() => selectCourse(course)}
            remove={() => deleteCourse(course.code)}
          />
        ))}
        <EmptyRow create={createCourse} />
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
    lessons: <>{course.lessons.length}</>,
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

type EmptyRowProps = {
  create: (courseData: Omit<Course, 'group'>) => void;
};
function EmptyRow({ create }: EmptyRowProps) {
  const [localCourse, updateLocalCourse] = useReducer(
    (prev: Course, next: Partial<Course>) => ({
      ...prev,
      ...next,
    }),

    {
      code: '',
      ...EMPTY_COURSE,
    }
  );
  const handleSubmit = () => {
    try {
      create(localCourse);
      updateLocalCourse({ code: '', ...EMPTY_COURSE });
    } catch (error) {
      console.error(error);
    }
  };
  const rowElements = {
    code: (
      <LazyInput
        type="text"
        value={localCourse.code}
        setValue={(value) => updateLocalCourse({ code: value })}
      />
    ),
    staffCode: (
      <LazyInput
        type="text"
        value={localCourse.staffCode}
        setValue={(value) => updateLocalCourse({ staffCode: value })}
      />
    ),
    lessons: <></>,
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
