import Card from '@/components/Card';
import useStore from '@/stores';
import { Lesson } from '@/types';

import LessonsTable from './LessonsTable';

type Props = {
  code: string;
};

const sortLesson = (a: Lesson, b: Lesson) => (a.day < b.day ? -1 : 1);

export default function EditLessons({ code }: Props) {
  const staffCode = useStore((state) => state.getCourse(code).staffCode);
  const lessons = useStore((state) => state.getLessons(code).sort(sortLesson));
  const addLesson = useStore((state) => state.addLesson);
  const setLessons = useStore((state) => state.setLessons);

  const handleAdd = (lessonData: Omit<Lesson, 'code'>) => {
    addLesson({
      code,
      ...lessonData,
    });
  };
  const updateLesson = (index: number) => (lessonData: Partial<Lesson>) => {
    const newLessons = [...lessons];
    newLessons[index] = {
      ...newLessons[index],
      ...lessonData,
    };
    setLessons(code)(newLessons);
  };
  const removeLesson = (index: number) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(code)(newLessons);
  };

  return (
    <Card title={`Edit Timetable for ${code}`} titleElement="h3">
      <LessonsTable
        staffCode={staffCode}
        lessons={lessons}
        addLesson={handleAdd}
        updateLesson={updateLesson}
        removeLesson={removeLesson}
      />
    </Card>
  );
}
