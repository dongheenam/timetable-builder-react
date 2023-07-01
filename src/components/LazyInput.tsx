import { useState } from 'react';

type InputValue = string | number | undefined;
type Props<T extends InputValue> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    value: T;
    setValue: (value: T) => void;
  };

export default function LazyInput<T extends InputValue>({
  value,
  setValue,
  ...otherProps
}: Props<T>) {
  const [internalValue, setInternalValue] = useState<T>(value);
  const handleBlur = () => {
    try {
      if (value !== internalValue) {
        setValue(internalValue);
      }
    } catch (error) {
      setInternalValue(value);
      console.error(error);
    }
  };
  return (
    <input
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value as T)}
      onBlur={handleBlur}
      {...otherProps}
    ></input>
  );
}
