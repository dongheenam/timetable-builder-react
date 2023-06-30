import ButtonBase, { Props as ButtonBaseProps } from './ButtonBase';
import styles from './ButtonIcon.module.css';

type Props = {
  icon: React.ReactElement;
  label: string;
} & Omit<ButtonBaseProps, 'children'>;
export default function ButtonIcon({ icon, ...otherProps }: Props) {
  return (
    <ButtonBase className={styles['button-icon']} {...otherProps}>
      {icon}
    </ButtonBase>
  );
}
