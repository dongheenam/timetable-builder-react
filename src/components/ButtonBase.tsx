import styles from './ButtonBase.module.css';

export type Props = React.HTMLAttributes<HTMLButtonElement> & {
  color?: 'gray' | 'primary' | 'green' | 'yellow' | 'red';
  variant?: 'default' | 'outline' | 'subtle' | 'filled';
  label?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

let vars: Record<string, string | null> = {
  '--text': null, // text color
  '--text-hover': null, // text color on hover
  '--bd': null, // border color
  '--bg': null, // background color
  '--bg-hover': null, // background color on hover
  '--bg-active': null, // background color on click
};

export default function Button({
  color = 'gray',
  variant = 'default',
  className = '',
  label = undefined,
  children,
  ...otherProps
}: Props) {
  if (color !== 'gray') {
    vars['--text'] = `var(--${color}11)`;
    vars['--textHover'] = `var(--${color}12)`;
    vars['--bgHover'] = `var(--${color}4)`;
    vars['--bgActive'] = `var(--${color}5)`;
  }
  switch (variant) {
    case 'outline':
      vars['--bd'] = `currentColor`;
      break;
    case 'subtle':
      vars['--bg'] = `var(--${color}3)`;
      break;
    case 'filled':
      vars = {
        ...vars,
        ['--text']: `var(--bg)`,
        ['--textHover']: `var(--bg)`,
        ['--bg']: `var(--${color}9)`,
        ['--bgHover']: `var(--${color}10)`,
        ['--bgActive']: `var(--${color}11)`,
      };
      break;
  }

  return (
    <button
      className={[styles['button'], className].join(' ')}
      style={vars}
      aria-label={label}
      title={label}
      {...otherProps}
    >
      {children}
    </button>
  );
}
