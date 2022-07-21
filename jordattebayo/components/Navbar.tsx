import { useState, useEffect } from "react";
import Link from "next/link";

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
  
  return (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a tabIndex={0}>
            <span>Home</span>
          </a>
        </Link>
      </li>
      <li >
        <Link href="/about">
          <a tabIndex={0}>
            <span>About</span>
          </a>
        </Link>
      </li>
      <li>
        <a
          href="https://www.github.com/jordattebayo"
          target="_blank"
          tabIndex={0}
        >
          <span>GitHub</span>
        </a>
      </li>
      <li>
        <Link href="/#projects">
          <a tabIndex={0}>
            <span>Projects</span>
          </a>
        </Link>
      </li>
    </ul>
  </nav>
  );
}
