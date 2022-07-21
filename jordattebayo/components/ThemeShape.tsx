import styles from "./themeShape.module.sass";

export default function ThemeShape() {
  return (
    <div className={styles.ltContainer}>
      <div className={styles.ltShape40}></div>
      <div className={styles.ltShape60}></div>
      <div className={styles.ltShape80}></div>
      <div className={styles.ltShape100}></div>
    </div>
  );
}
