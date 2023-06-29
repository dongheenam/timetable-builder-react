import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/edit', label: 'Edit' },
  { href: '/view', label: 'View' },
];

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['title-block']}>
        <span className={styles['title']}>Timetable builder</span>
        <span>v2</span>
      </div>
      <nav className={styles['nav-block']}>
        <ul className={styles['nav-list']}>
          {navItems.map(({ href, label }) => (
            <li className={styles['nav-item']} key={href}>
              <Link to={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
