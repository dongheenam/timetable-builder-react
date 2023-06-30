import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

import styles from './Card.module.css';
import ButtonIcon from './ButtonIcon';

type Props = {
  title: string;
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  open?: boolean;
  toggleable?: boolean;
  children: React.ReactNode;
};
export default function Card({
  title,
  titleElement = 'h2',
  open = true,
  toggleable = false,
  children,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(open);

  const handleToggle = () => {
    if (toggleable) {
      setIsExpanded((prev) => !prev);
    }
  };

  const Title = titleElement;
  return (
    <div className={styles['card']} aria-expanded={isExpanded}>
      <div className={styles['title-block']} onClick={handleToggle}>
        <Title>{title}</Title>
        {toggleable && (
          <ButtonIcon
            label="open or close the card"
            icon={<IconChevronDown className={styles['toggle-icon']} />}
            onClick={handleToggle}
          />
        )}
      </div>
      <div className={styles['content-block']}>{children}</div>
    </div>
  );
}
