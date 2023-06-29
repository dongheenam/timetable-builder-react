export type StaffLookup = {
  [code: string]: string;
};

export type Lesson = {
  day: number;
  period: number;
  room: string;
  staff: null | string;
};

export type Course = {
  code: string;
  staff: null | string;
  sharesTimetableWith: null | string;
  lessons: Lesson[];
};

export type CourseGroup = {
  name: string;
  courses: Course[];
};
