import Card from '@/components/Card';
import useStore from '@/stores';
import CoursesTable from './CoursesTable';

type Props = {
  group: string | undefined;
};
export default function EditCourses({ group }: Props) {
  const groupExists = !!group;
  const courses = groupExists
    ? useStore((state) => state.getCourseArrayByGroup(group))
    : [];
  const updateCourse = useStore((state) => state.updateCourse);
  const deleteCourse = useStore((state) => state.deleteCourse);
  const title = groupExists ? `Courses for ${group}` : `Create a group`;
  return (
    <Card title={title} titleElement="h3" open>
      <CoursesTable
        courses={courses}
        updateCourse={updateCourse}
        deleteCourse={deleteCourse}
      />
      {JSON.stringify(courses)}
    </Card>
  );
}
