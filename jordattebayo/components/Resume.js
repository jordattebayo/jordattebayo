import styles from './resume.module.sass'

export default function Resume() {
  return (
    <div className={styles.container}>
      <div className={styles.resContainer}>
        <p className={styles.resText}>
          Want to find out more, but in a way that's less fun?
        </p>
        <a
          href='/Jordan_Booker_Website_Resume.pdf'
          download='Jordan_Booker_Resume'
        >
          <button className={styles.btn}>Download Resume</button>
        </a>
      </div>
    </div>
  )
}
