import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from './utils';
import type { StaffLookup, Lesson, Course, CourseGroup } from '@/types';

export type StoreState = {
  staffLookup: StaffLookup;
  courseGroups: CourseGroup[];
};

const storeBase = create<StoreState>()(
  persist(
    (set) => ({
      staffLookup: {},
      courseGroups: [],
    }),

    // persist options
    {
      name: `timetable-builder-${APP_VERSION}`,
      getStorage: () => localStorage,
    }
  )
);

const useStore = createSelectors(storeBase);
export default useStore;
