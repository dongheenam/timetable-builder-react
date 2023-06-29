export type Staff = {
  code: string;
  name: string;
};

export type Lesson = {
  day: number;
  period: number;
  room: string;
  staff: null | Staff;
};

export type Course = {
  code: string;
  staff: null | Staff;
  sharesTimetableWith: null | string;
  lessons: Lesson[];
};

export type CourseGroup = {
  name: string;
  courses: Course[];
};
