import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['title-block']}>
        <span className={styles['title']}>Timetable builder</span>
        <span>v2</span>
      </div>
      <nav className={styles['nav-block']}>
        <ul className={styles['nav-list']}></ul>
      </nav>
    </header>
  );
}
