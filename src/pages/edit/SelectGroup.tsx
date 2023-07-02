import Card from '@/components/Card';

type Props = {
  groups: string[];
  setSelectedGroup: (group: string) => void;
};
export default function SelectGroup({ groups, setSelectedGroup }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  const options = [
    ...groups.map((group) => ({ name: group, value: group })),
    { name: 'Create new...', value: '' },
  ];
  return (
    <Card title="Groups" titleElement="h3" open>
      <select onChange={handleChange} size={10}>
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </Card>
  );
}
