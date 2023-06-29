import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Staffs, Courses } from '@/types';

export type StoreState = {
  courses: Courses;
  staffs: Staffs;
  createCoursesByGroup: (group: string) => (courseCodes: string[]) => void;
  removeCoursesByGroup: (name: string) => void;
  updateCourse: (
    code: string
  ) => (courseData: Partial<Courses[string]>) => void;
  deleteCourse: (code: string) => void;
  setStaff: (code: string, name: string) => void;
};

const EMPTY_COURSE = {
  courseGroup: '',
  staffCode: null,
  sharesTimetableWith: null,
  lessons: [],
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      courses: {},
      staffs: {},
      createCoursesByGroup: (group) => (courseCodes) => {
        if (group in get().courses) {
          throw new Error(`Course group ${group} already exists`);
        }
        const courseSet = courseCodes.reduce((acc, code) => {
          acc[code] = { ...EMPTY_COURSE, courseGroup: group };
          return acc;
        }, {} as Courses);
        set((state) => ({ courses: { ...state.courses, ...courseSet } }));
      },
      removeCoursesByGroup: (group) => {
        const { courses } = get();
        const codesToDelete = Object.keys(courses).filter(
          (code) => courses[code].courseGroup === group
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
      getStorage: () => localStorage,
    }
  )
);

// const useStore = createSelectors(storeBase);
export default useStore;
