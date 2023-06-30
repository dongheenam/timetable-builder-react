import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Staffs, Courses } from '@/types';

export type StoreState = {
  courses: Courses;
  staffs: Staffs;
  getCourseGroups: () => string[];
  updateCourseGroup: (oldName: string, newName: string) => void;
  createCoursesByGroup: (group: string) => (courseCodes: string[]) => void;
  getCoursesByGroup: (group: string) => Courses;
  removeCoursesByGroup: (name: string) => void;
  updateCourse: (
    code: string
  ) => (courseData: Partial<Courses[string]>) => void;
  deleteCourse: (code: string) => void;
  setStaff: (code: string, name: string) => void;
};

const EMPTY_COURSE = {
  courseGroup: '',
  staffCode: '',
  sharesTimetableWith: null,
  lessons: [],
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      courses: {
        SE0701: {
          group: 'Year 7 Science',
          staffCode: 'QED',
          sharesTimetableWith: null,
          lessons: [
            {
              day: 1,
              period: 2,
              room: 'SN101',
            },
            {
              day: 2,
              period: 5,
              room: 'SN101',
            },
            {
              day: 3,
              period: 4,
              room: 'SN101',
            },
          ],
        },
        SE0702: {
          group: 'Year 7 Science',
          staffCode: 'JXT',
          sharesTimetableWith: null,
          lessons: [
            {
              day: 1,
              period: 2,
              room: 'SN101',
            },
            {
              day: 2,
              period: 5,
              room: 'SN101',
            },
            {
              day: 3,
              period: 4,
              room: 'SN101',
            },
          ],
        },
      },
      staffs: {},
      getCourseGroups: () => {
        const { courses } = get();
        return Object.keys(courses).reduce((acc, code) => {
          const group = courses[code].group;
          if (!acc.includes(group)) {
            acc.push(group);
          }
          return acc;
        }, [] as string[]);
      },
      updateCourseGroup: (oldName, newName) => {
        set((state) => {
          const courses = { ...state.courses };
          Object.keys(courses).forEach((code) => {
            if (courses[code].group === oldName) {
              courses[code].group = newName;
            }
          });
          return { ...state, courses };
        });
      },
      createCoursesByGroup: (group) => (courseCodes) => {
        if (group in get().courses) {
          throw new Error(`Course group ${group} already exists`);
        }
        const courseSet = courseCodes.reduce((acc, code) => {
          acc[code] = { ...EMPTY_COURSE, group };
          return acc;
        }, {} as Courses);
        set((state) => ({ courses: { ...state.courses, ...courseSet } }));
      },
      getCoursesByGroup: (group) => {
        const { courses } = get();
        return Object.keys(courses).reduce((acc, code) => {
          if (courses[code].group === group) {
            acc[code] = courses[code];
          }
          return acc;
        }, {} as Courses);
      },
      removeCoursesByGroup: (group) => {
        const { courses } = get();
        const codesToDelete = Object.keys(courses).filter(
          (code) => courses[code].group === group
        );
        const newCourses = { ...courses };
        codesToDelete.forEach((code) => delete newCourses[code]);
        set({ courses: newCourses });
      },
      updateCourse: (code) => (courseData) => {
        set((state) => {
          const course = state.courses[code];
          if (!course) {
            throw new Error(`Course ${code} does not exist`);
          }
          return {
            ...state,
            courses: {
              ...state.courses,
              [code]: { ...course, ...courseData },
            },
          };
        });
      },
      deleteCourse: (code) => {
        set((state) => {
          const courses = { ...state.courses };
          delete courses[code];
          return { ...state, courses };
        });
      },
      setStaff: (code, name) => {
        set((state) => ({
          ...state,
          staffs: { ...state.staffs, [code]: name },
        }));
      },
    }),

    // persist options
    {
      name: `timetable-builder-${APP_VERSION}`,
    }
  )
);

// const useStore = createSelectors(storeBase);
export default useStore;
