import { useEffect, useState } from 'react';

type InputValue = string | number | undefined;
type Props<T extends InputValue> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    value: T;
    setValue: (value: T) => void;
  };

const toInternal = (value: InputValue, type: string): string => {
  if (value === undefined) return '';
  if (type === 'number') return value.toString();
  return value as string;
};
const fromInternal = (internalValue: string, type: string): InputValue => {
  if (type === 'number') return parseInt(internalValue);
  return internalValue;
};

export default function LazyInput<T extends InputValue>({
  value,
  setValue,
  type = 'text',
  ...otherProps
}: Props<T>) {
  const [internalValue, setInternalValue] = useState<string>(
    toInternal(value, type)
  );
  useEffect(() => setInternalValue(toInternal(value, type)), [value]);
  const handleBlur = () => {
    try {
      if (value !== internalValue) {
        setValue(fromInternal(internalValue, type) as T);
      }
    } catch (error) {
      setInternalValue(toInternal(value, type));
      console.error(error);
    }
  };
  return (
    <input
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleBlur}
      {...otherProps}
    />
  );
}
