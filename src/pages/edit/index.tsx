import { useEffect, useState } from 'react';
import useStore from '@/stores';

import SelectGroup from './SelectGroup';
import EditCourses from './EditCourses';
import EditLessons from './EditLessons';

import './index.css';

export default function Edit() {
  const groups = useStore((state) => state.getCourseGroups());
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0]);
  const [selectedCourse, setSelectedCourse] = useState<string>();

  useEffect(() => setSelectedCourse(undefined), [selectedGroup]);

  return (
    <main>
      <h1>Edit</h1>
      <h2>Classes</h2>
      <div className="edit-section">
        <SelectGroup groups={groups} setSelectedGroup={setSelectedGroup} />
        {selectedGroup && (
          <EditCourses group={selectedGroup} selectCourse={setSelectedCourse} />
        )}
        {selectedCourse && <EditLessons code={selectedCourse} />}
      </div>
    </main>
  );
}
