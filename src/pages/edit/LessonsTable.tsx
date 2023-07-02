import { useReducer } from 'react';
import { IconPlus, IconX } from '@tabler/icons-react';

import ButtonIcon from '@/components/ButtonIcon';
import LazyInput from '@/components/LazyInput';
import { EMPTY_LESSON, Lesson, lessonSchema } from '@/types';

type KEY = 'day' | 'period' | 'staffCode' | 'room' | 'actions';
const COLUMNS: { key: KEY; header: string }[] = [
  {
    header: 'Day',
    key: 'day',
  },
  {
    header: 'Period',
    key: 'period',
  },
  {
    header: 'Room',
    key: 'room',
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
  staffCode: string;
  lessons: Lesson[];
  addLesson: (lessonData: Omit<Lesson, 'code'>) => void;
  updateLesson: (index: number) => (lessonData: Partial<Lesson>) => void;
  removeLesson: (index: number) => void;
};
export default function LessonsTable({
  staffCode,
  lessons,
  addLesson,
  updateLesson,
  removeLesson,
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
        {lessons.map((lesson, index) => (
          <LessonRow
            key={`${lesson.day}${lesson.period}`}
            lesson={lesson}
            update={updateLesson(index)}
            remove={() => removeLesson(index)}
          />
        ))}
        <EmptyRow create={addLesson} defaultLesson={{ staffCode }} />
      </tbody>
    </table>
  );
}

type LessonRowProps = {
  lesson: Lesson;
  update: (lessonData: Partial<Lesson>) => void;
  remove: () => void;
};
function LessonRow({ lesson, update, remove }: LessonRowProps) {
  const rowElements = {
    day: (
      <LazyInput
        value={lesson.day}
        type="number"
        setValue={(value) => update({ day: value })}
      />
    ),
    period: (
      <LazyInput
        value={lesson.period}
        type="number"
        setValue={(value) => update({ period: value })}
      />
    ),
    room: (
      <LazyInput
        value={lesson.room}
        setValue={(value) => update({ room: value })}
      />
    ),
    staffCode: (
      <LazyInput
        value={lesson.staffCode}
        setValue={(value) => update({ staffCode: value })}
      />
    ),
    actions: (
      <ButtonIcon
        label={`delete lesson`}
        onClick={remove}
        icon={<IconX stroke={1.5} />}
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

type EmptyRowProps = {
  defaultLesson: Partial<Lesson>;
  create: (lessonData: Omit<Lesson, 'code'>) => void;
};
function EmptyRow({ create, defaultLesson }: EmptyRowProps) {
  const [lessonForm, setLessonForm] = useReducer(
    (lesson: Partial<Lesson>, update: Partial<Lesson>) => ({
      ...lesson,
      ...update,
    }),
    {
      ...EMPTY_LESSON,
      ...defaultLesson,
    }
  );
  const handleSubmit = () => {
    try {
      const lesson = lessonSchema
        .pick({ day: true, period: true, room: true, staffCode: true })
        .parse(lessonForm);
      create(lesson);
      setLessonForm({
        ...EMPTY_LESSON,
        ...defaultLesson,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const rowElements = {
    day: (
      <LazyInput
        value={lessonForm.day}
        setValue={(value) => setLessonForm({ day: value })}
      />
    ),
    period: (
      <LazyInput
        value={lessonForm.period}
        setValue={(value) => setLessonForm({ period: value })}
      />
    ),
    room: (
      <LazyInput
        value={lessonForm.room}
        setValue={(value) => setLessonForm({ room: value })}
      />
    ),
    staffCode: (
      <LazyInput
        value={lessonForm.staffCode}
        setValue={(value) => setLessonForm({ staffCode: value })}
      />
    ),
    actions: (
      <ButtonIcon
        label={`add lesson`}
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
