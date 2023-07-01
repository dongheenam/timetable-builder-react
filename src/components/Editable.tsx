import { useState, useRef, useEffect } from 'react';

type PassiveInputProps = {
  name: string;
  placeholder?: string;
};
type ActiveInputProps = Omit<PassiveInputProps, 'name'> & {
  name?: string;
  value: string;
  setValue: (value: string) => void;
};
export default function Editable(props: PassiveInputProps | ActiveInputProps) {
  const isActive = 'value' in props;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(isActive ? props.value : '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const submit = (newValue: string) => {
    try {
      if (isActive && props.value !== newValue) {
        props.setValue(newValue);
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    submit(e.target.value);
  };
  const handleClick = () => {
    setIsEditing(true);
  };
  const handleFocus = () => {
    setIsEditing(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        submit(e.currentTarget.value);
        break;
    }
  };
  return (
    <label onFocus={handleFocus} tabIndex={0}>
      {isEditing ? (
        <input
          type="text"
          name={props.name}
          ref={inputRef}
          value={text}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span onClick={handleClick}>
          {text || props.placeholder || 'type text...'}
        </span>
      )}
    </label>
  );
}
