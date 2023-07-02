import Card from '@/components/Card';
import useStore from '@/stores';
import { Course, EMPTY_COURSE } from '@/types';

import CoursesTable from './CoursesTable';

type Props = {
  group: string;
  selectCourse: (code: string) => void;
};

const sortCourse = (a: Course, b: Course) => (a.code < b.code ? -1 : 1);

export default function EditCourses({ group, selectCourse }: Props) {
  const courses = useStore((state) => state.getCoursesByGroup(group));
  const addCourse = useStore((state) => state.addCourse);
  const updateCourse = useStore((state) => state.updateCourse);
  const removeCourse = useStore((state) => state.removeCourse);

  const handleAdd = (courseData: Partial<Course>) => {
    addCourse({
      ...EMPTY_COURSE,
      group,
      ...courseData,
    });
  };

  const title = `Courses for ${group}`;
  return (
    <Card title={title} titleElement="h3" open>
      <CoursesTable
        courses={courses.sort(sortCourse)}
        addCourse={handleAdd}
        updateCourse={updateCourse}
        selectCourse={selectCourse}
        removeCourse={removeCourse}
      />
      {JSON.stringify(courses)}
    </Card>
  );
}
