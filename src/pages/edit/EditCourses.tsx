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
  const updateCourses = useStore((state) => state.updateCourses);
  const title = groupExists ? `Courses for ${group}` : `Create a group`;
  return (
    <Card title={title} titleElement="h3" open>
      <CoursesTable group={group} courses={courses} />
    </Card>
  );
}
