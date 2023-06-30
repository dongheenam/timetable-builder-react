export type Staffs = {
  [code: string]: string;
};

export type Lesson = {
  day: number;
  period: number;
  room: string;
  staffCode?: string;
};

export type Courses = {
  [code: string]: {
    group: string;
    staffCode: string;
    sharesTimetableWith: null | string;
    lessons: Lesson[];
  };
};

export type CourseArray = (Courses[string] & { code: string })[];
