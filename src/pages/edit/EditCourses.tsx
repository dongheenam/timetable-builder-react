import Card from '@/components/Card';
import useStore from '@/stores';
import { Course } from '@/types';

import CoursesTable from './CoursesTable';

type Props = {
  group: string;
  selectCourse: (course: Course) => void;
};

const sortCourse = (a: Course, b: Course) => (a.code < b.code ? -1 : 1);

export default function EditCourses({ group, selectCourse }: Props) {
  const courses = useStore((state) => state.getCoursesByGroup(group));
  const createCourse = useStore((state) => state.createCourse);
  const updateCourse = useStore((state) => state.updateCourse);
  const deleteCourse = useStore((state) => state.deleteCourse);
  const title = `Courses for ${group}`;
  return (
    <Card title={title} titleElement="h3" open>
      <CoursesTable
        courses={courses.sort(sortCourse)}
        createCourse={(courseData) => createCourse({ ...courseData, group })}
        updateCourse={updateCourse}
        selectCourse={selectCourse}
        deleteCourse={deleteCourse}
      />
      {JSON.stringify(courses)}
    </Card>
  );
}
