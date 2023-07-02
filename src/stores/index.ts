import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

import {
  StaffDict,
  CourseDict,
  Course,
  LessonsDict,
  Lesson,
  courseSchema,
  lessonSchema,
} from '@/types';
import { DUMMY_COURSES, DUMMY_LESSONS } from './dummyCourses';

export type StoreState = {
  courses: CourseDict;
  lessons: LessonsDict;
  staffs: StaffDict;
  addCourse: (course: Course) => void;
  getCourse: (code: string) => Course;
  updateCourse: (code: string) => (courseUpdate: Partial<Course>) => void;
  removeCourse: (code: string) => void;
  getCourseGroups: () => string[];
  getCoursesByGroup: (group: string) => Course[];
  renameCourseGroup: (oldName: string, newName: string) => void;
  removeCoursesBy: (filter: Partial<Course>) => void;
  getLessons: (code: string) => Lesson[];
  addLesson: (lesson: Lesson) => void;
  setLessons: (code: string) => (lessonsData: Omit<Lesson, 'code'>[]) => void;
};

const useStore = create<StoreState>()(
  // persist(
  (set, get) => ({
    courses: DUMMY_COURSES,
    lessons: DUMMY_LESSONS,
    staffs: {},
    addCourse: (course) => {
      const { code, ...courseData } = courseSchema.parse(course);
      set((state) => {
        const courses = { ...state.courses };
        const lessons = { ...state.lessons };
        if (code in courses) {
          throw new Error(`Course ${code} already exists`);
        }
        courses[code] = courseData;
        lessons[code] = [];
        return { ...state, courses, lessons };
      });
    },
    getCourse: (code) => {
      if (!code) {
        throw new Error('Course code is required');
      }
      const courses = get().courses;
      if (!(code in courses)) {
        throw new Error(`Course ${code} does not exist`);
      }
      return { code, ...courses[code] };
    },
    updateCourse: (code) => (courseUpdate) => {
      const { code: newCode, ...courseData } = courseSchema
        .partial()
        .parse(courseUpdate);

      set((state) => {
        const courses = { ...state.courses };
        if (!(code in state.courses)) {
          throw new Error(`Course ${code} does not exist`);
        }

        const updateCode = newCode !== undefined && newCode !== code;
        // if course code is not updated
        const newCourse = { ...courses[code], ...courseData };
        if (!updateCode) {
          courses[code] = newCourse;

          return { ...state, courses };
        }

        // if course code is updated
        if (newCode in courses) {
          throw new Error(`Course ${newCode} already exists`);
        }

        courses[newCode] = newCourse;
        delete courses[code];

        const lessons = { ...state.lessons };
        lessons[newCode] = lessons[code];
        delete lessons[code];

        return {
          ...state,
          courses,
          lessons,
        };
      });
    },
    removeCourse: (code) => {
      set((state) => {
        const courses = { ...state.courses };
        const lessons = { ...state.lessons };
        if (!(code in courses)) {
          throw new Error(`Course ${code} does not exist`);
        }

        delete courses[code];
        delete lessons[code];
        return { ...state, courses, lessons };
      });
    },
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
    getCoursesByGroup: (group) => {
      if (!group) return [];
      const { courses } = get();
      return Object.keys(courses).reduce((acc, code) => {
        if (courses[code].group === group) {
          acc.push({ code, ...courses[code] });
        }
        return acc;
      }, [] as Course[]);
    },
    renameCourseGroup: (oldName, newName) => {
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
    removeCoursesBy: (filter) => {
      const { code, ...filterData } = courseSchema.partial().parse(filter);
      if (code) {
        get().removeCourse(code);
      }

      set((state) => {
        const { courses, lessons } = state;
        const courseCodes = Object.keys(courses);
        const codesToDelete = courseCodes.filter((code) =>
          (Object.keys(filterData) as (keyof CourseDict[string])[]).every(
            (key) => courses[code][key] === filter[key]
          )
        );
        for (const code in codesToDelete) {
          delete courses[code];
          delete lessons[code];
        }
        return { ...state, courses, lessons };
      });
    },
    getLessons: (code) => {
      const { lessons } = get();
      if (!(code in lessons)) {
        throw new Error(`Lessons for ${code} does not exist`);
      }
      return lessons[code].map((lesson) => ({ code, ...lesson }));
    },
    addLesson: (lesson) => {
      const { code, ...lessonData } = lessonSchema.parse(lesson);
      set((state) => {
        const lessons = { ...state.lessons };
        if (!(code in state.lessons)) {
          throw new Error(`Lessons for ${code} does not exist`);
        }
        lessons[code].push(lessonData);
        return { ...state, lessons };
      });
    },
    setLessons: (code) => (lessons) => {
      const lessonsData = lessons.map((lesson) => lessonSchema.parse(lesson));
      set((state) => {
        const lessons = { ...state.lessons };
        if (!(code in state.lessons)) {
          throw new Error(`Lessons for ${code} does not exist`);
        }
        lessons[code] = lessonsData;
        return { ...state, lessons };
      });
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
