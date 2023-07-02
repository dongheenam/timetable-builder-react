import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

import type { Staffs, Courses, CourseArray } from '@/types';
import { DUMMY_COURSES } from './dummyCourses';

export type StoreState = {
  courses: Courses;
  staffs: Staffs;
  getCourseGroups: () => string[];
  updateCourseGroup: (oldName: string, newName: string) => void;
  createCoursesByGroup: (group: string) => (courseCodes: string[]) => void;
  getCoursesByGroup: (group: string) => Courses;
  getCourseArrayByGroup: (group: string) => CourseArray;
  removeCoursesByGroup: (name: string) => void;
  updateCourse: (
    code: string
  ) => (courseUpdate: Partial<CourseArray[number]>) => void;
  deleteCourse: (code: string) => void;
  setStaff: (code: string, name: string) => void;
};

const EMPTY_COURSE = {
  group: '',
  staffCode: '',
  sharesTimetableWith: null,
  lessons: [],
};

const useStore = create<StoreState>()(
  // persist(
  (set, get) => ({
    courses: DUMMY_COURSES,
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
    getCourseArrayByGroup: (group) => {
      if (!group) return [];
      const courses = get().getCoursesByGroup(group);
      return Object.entries(courses).map(([code, course]) => ({
        code,
        ...course,
      }));
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
    updateCourse:
      (code) =>
      ({ code: newCode, ...courseData }) => {
        set((state) => {
          const courses = { ...state.courses };
          if (!(code in state.courses)) {
            throw new Error(`Course ${code} does not exist`);
          }

          const updateCode = newCode !== undefined && newCode !== code;
          if (updateCode && newCode in courses) {
            throw new Error(`Course ${newCode} already exists`);
          }
          const newCourse = { ...courses[code], ...courseData };
          if (updateCode) {
            delete courses[code];
            courses[newCode] = newCourse;
          } else {
            courses[code] = newCourse;
          }
          return {
            ...state,
            courses,
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
  })

  //   // persist options
  //   {
  //     name: `timetable-builder-${APP_VERSION}`,
  //   }
  // )
);

// const useStore = createSelectors(storeBase);
export default useStore;
