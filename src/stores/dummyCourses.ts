import { CourseDict, LessonsDict } from '@/types';

export const DUMMY_COURSES: CourseDict = {
  SE0701: {
    group: 'Year 7 Science',
    staffCode: 'QED',
    sharesTimetableWith: null,
  },
  SE0702: {
    group: 'Year 7 Science',
    staffCode: 'JXT',
    sharesTimetableWith: null,
  },
  SE0801: {
    group: 'Year 8 Science',
    staffCode: 'ABC',
    sharesTimetableWith: null,
  },
};

export const DUMMY_LESSONS: LessonsDict = {
  SE0701: [
    {
      day: 1,
      period: 1,
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: 2,
      period: 5,
      staffCode: 'QED',
      room: 'SE101',
    },
    {
      day: 3,
      period: 2,
      staffCode: 'QED',
      room: 'SE101',
    },
  ],
  SE0702: [
    {
      day: 1,
      period: 1,
      staffCode: 'QED',
      room: 'SN201',
    },
  ],
};
