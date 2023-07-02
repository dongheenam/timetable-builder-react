import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

import type { Staffs, CourseDict, CourseArray, Course } from '@/types';
import { DUMMY_COURSES } from './dummyCourses';

export type StoreState = {
  courses: CourseDict;
  staffs: Staffs;
  getCourseGroups: () => string[];
  createCourse: (course: Course) => void;
  updateCourseGroup: (oldName: string, newName: string) => void;
  getCourse: (code: string) => Course;
  getCoursesByGroup: (group: string) => CourseArray;
  removeCoursesByGroup: (name: string) => void;
  updateCourse: (
    code: string
  ) => (courseUpdate: Partial<CourseArray[number]>) => void;
  deleteCourse: (code: string) => void;
  setStaff: (code: string, name: string) => void;
};

export const EMPTY_COURSE: CourseDict[string] = {
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
    createCourse: (course) => {
      const { code, ...courseData } = course;
      if (!code || !courseData.group) {
        throw new Error('Course code and group are required');
      }
      set((state) => {
        const courses = { ...state.courses };
        if (code in courses) {
          throw new Error(`Course ${code} already exists`);
        }
        courses[code] = { ...EMPTY_COURSE, ...courseData };
        return { ...state, courses };
      });
    },
    getCourse: (code) => {
      if (!code) {
        throw new Error('Course code is required');
      }
      const course = get().courses[code];
      return { code, ...course };
    },
    getCoursesByGroup: (group) => {
      if (!group) return [];
      const { courses } = get();
      return Object.keys(courses).reduce((acc, code) => {
        if (courses[code].group === group) {
          acc.push({ code, ...courses[code] });
        }
        return acc;
      }, [] as CourseArray);
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
