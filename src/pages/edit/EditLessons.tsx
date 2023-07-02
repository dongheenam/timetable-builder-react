import Card from '@/components/Card';
import useStore from '@/stores';
import { Lesson } from '@/types';

import LessonsTable from './LessonsTable';

type Props = {
  courseCode: string;
};

const sortLesson = (a: Lesson, b: Lesson) => (a.day < b.day ? -1 : 1);

export default function EditLessons({ courseCode }: Props) {
  const course = useStore((state) => state.getCourse(courseCode));
  const lessons = course.lessons;
  const updateCourse = useStore((state) => state.updateCourse(courseCode));
  const updateLessons = (lessons: Lesson[]) => updateCourse({ lessons });

  const updateLesson = (index: number) => (lessonData: Partial<Lesson>) => {
    const newLessons = [...lessons];
    newLessons[index] = {
      ...newLessons[index],
      ...lessonData,
    };
    updateLessons(newLessons);
  };
  const createLesson = (lesson: Lesson) => updateLessons([...lessons, lesson]);
  const removeLesson = (index: number) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    updateLessons(newLessons);
  };

  return (
    <Card title={`Edit Timetable for ${courseCode}`} titleElement="h3">
      <LessonsTable
        staffCode={course.staffCode}
        lessons={lessons.sort(sortLesson)}
        updateLesson={updateLesson}
        createLesson={createLesson}
        removeLesson={removeLesson}
      />
    </Card>
  );
}
