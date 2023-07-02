import { z } from 'zod';

export type StaffDict = {
  [code: string]: string;
};

export const lessonSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: 'Course code is required' }),
  day: z.number(),
  period: z.number(),
  room: z.string().trim().toUpperCase(),
  staffCode: z.string().trim().toUpperCase(),
});
export type Lesson = z.infer<typeof lessonSchema>;
export const EMPTY_LESSON: Partial<Lesson> = {
  code: '',
  day: undefined,
  period: undefined,
  room: '',
  staffCode: '',
};
export type LessonsDict = {
  [code: string]: Omit<Lesson, 'code'>[];
};

export const courseSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: 'Course code is required' }),
  group: z.string(),
  staffCode: z.string().trim().toUpperCase(),
  sharesTimetableWith: z.string().trim().toUpperCase().nullable(),
});
export type Course = z.infer<typeof courseSchema>;
export const EMPTY_COURSE: Course = {
  code: '',
  group: '',
  staffCode: '',
  sharesTimetableWith: null,
};
export type CourseDict = {
  [code: string]: Omit<Course, 'code'>;
};
