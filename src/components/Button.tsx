import ButtonBase, { Props as ButtonBaseProps } from './ButtonBase';
import styles from './Button.module.css';

type Props = ButtonBaseProps;
export default function Button({ children, ...otherProps }: Props) {
  return (
    <ButtonBase className={styles['button']} {...otherProps}>
      {children}
    </ButtonBase>
  );
}
