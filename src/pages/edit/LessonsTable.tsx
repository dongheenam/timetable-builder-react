import { useReducer } from 'react';
import { IconPlus, IconX } from '@tabler/icons-react';

import ButtonIcon from '@/components/ButtonIcon';
import LazyInput from '@/components/LazyInput';
import { Lesson } from '@/types';

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
  updateLesson: (index: number) => (lessonData: Partial<Lesson>) => void;
  createLesson: (lesson: Lesson) => void;
  removeLesson: (index: number) => void;
};
export default function LessonsTable({
  staffCode,
  lessons,
  updateLesson,
  createLesson,
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
        <EmptyRow create={createLesson} defaultLesson={{ staffCode }} />
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

const EMPTY_LESSON = {
  day: undefined,
  period: undefined,
  room: '',
  staffCode: '',
};

type EmptyRowProps = {
  defaultLesson: Partial<Lesson>;
  create: (lessonData: Lesson) => void;
};
function EmptyRow({ create, defaultLesson }: EmptyRowProps) {
  const [localLesson, updateLocalLesson] = useReducer(
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
      if (!localLesson.day || !localLesson.period) {
        throw new Error("Can't create lesson without day or period");
      }
      create(localLesson as Lesson);
      updateLocalLesson({
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
        value={localLesson.day}
        setValue={(value) => updateLocalLesson({ day: value })}
      />
    ),
    period: (
      <LazyInput
        value={localLesson.period}
        setValue={(value) => updateLocalLesson({ period: value })}
      />
    ),
    room: (
      <LazyInput
        value={localLesson.room}
        setValue={(value) => updateLocalLesson({ room: value })}
      />
    ),
    staffCode: (
      <LazyInput
        value={localLesson.staffCode}
        setValue={(value) => updateLocalLesson({ staffCode: value })}
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
