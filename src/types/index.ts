export type Staffs = {
  [code: string]: string;
};

export type Lesson = {
  day: number;
  period: number;
  room: string;
  staffCode?: string;
};

export type CourseDict = {
  [code: string]: {
    group: string;
    staffCode: string;
    sharesTimetableWith: null | string;
    lessons: Lesson[];
  };
};

export type Course = CourseDict[string] & { code: string };
export type CourseArray = Course[];
