import { useState } from 'react';

import styles from './Card.module.css';

type Props = {
  title: string;
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  isOpen?: boolean;
  toggleable?: boolean;
  children: React.ReactNode;
};
export default function Card({
  title,
  titleElement = 'h2',
  isOpen = true,
  toggleable = false,
  children,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    if (toggleable) {
      setIsExpanded((prev) => !prev);
    }
  };

  const Title = titleElement;
  return (
    <div className={styles['card']}>
      <div className={styles['title-block']}>
        <Title>{title}</Title>
        <button onClick={handleToggle}>Toggle</button>
      </div>
      <div className={styles['content-block']}>{isExpanded && children}</div>
    </div>
  );
}
