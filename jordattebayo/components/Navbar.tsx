import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring"
import Link from "next/link";
import styles from "./navbar.module.sass";

export default function Navbar () {

  const [view, setView] = useState("peek")
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  
  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const props = useSpring({ opacity: 1 })
  
  return (
  <nav className={styles.nav}>
    <ul className={styles.navContainer}>
      <animated.li style={props} className={styles.navLinkContainer}>
        <Link href="/">
          <a className={styles.navLinkHome} tabIndex={0}>
            <span>Home</span>
          </a>
        </Link>
      </animated.li>
      <animated.li style={props} className={styles.navLinkContainer}>
        <Link href="/about">
          <a className={styles.navLinkAbout} tabIndex={0}>
            <span>About</span>
          </a>
        </Link>
      </animated.li>
      <animated.li style={props} className={styles.navLinkContainer}>
        <a
          className={styles.navLinkGit}
          href="https://www.github.com/jordattebayo"
          target="_blank"
          tabIndex={0}
        >
          <span>GitHub</span>
        </a>
      </animated.li>
      <animated.li style={props} className={styles.navLinkContainer}>
        <Link href="/#projects">
          <a tabIndex={0} className={styles.navLinkProjects}>
            <span>Projects</span>
          </a>
        </Link>
      </animated.li>
    </ul>
  </nav>
  );
}
