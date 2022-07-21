import Link from "next/link";

export default function Navbar () {
  return (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a tabIndex={0}>
            Projects
          </a>
        </Link>
      </li>
      <li >
        <Link href="/about">
          <a tabIndex={0}>
            About
          </a>
        </Link>
      </li>
      <li>
        <Link href="/blog">
        <a
          tabIndex={0}
        >
          Blog
        </a>
        </Link>
      </li>
    </ul>
  </nav>
  );
}
