import { useState } from 'react';
import useStore from '@/stores';

import SelectGroup from './SelectGroup';
import EditCourses from './EditCourses';
import './index.css';

export default function Edit() {
  const groups = useStore((state) => state.getCourseGroups());
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0]);

  return (
    <main>
      <h1>Edit</h1>
      <h2>Classes</h2>
      <div className="edit-section">
        <SelectGroup groups={groups} setSelectedGroup={setSelectedGroup} />
        <EditCourses group={selectedGroup} />
      </div>
    </main>
  );
}
