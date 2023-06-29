export type Staffs = {
  [code: string]: string;
};

export type Lesson = {
  day: number;
  period: number;
  room: string;
  staffCode: null | string;
};

export type Courses = {
  [code: string]: {
    courseGroup: string;
    staffCode: null | string;
    sharesTimetableWith: null | string;
    lessons: Lesson[];
  };
};
