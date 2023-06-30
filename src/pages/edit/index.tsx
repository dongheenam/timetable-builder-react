import { useState } from 'react';

import Editable from '@/components/Editable';

export default function Edit() {
  const [value, setValue] = useState('Hello there');
  console.log(value);
  return (
    <main>
      <h1>Edit</h1>
      <Editable name="1" value={value} setValue={setValue} />
      <Editable name="2" />
      <Editable name="3" />
      <Editable name="4" />
      <Editable name="5" />
    </main>
  );
}
