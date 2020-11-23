import Navbar from "../nav/Navbar";
import Head from "next/head";
import Footer from "../footer/Footer";
import { Component } from "react";
import styles from "./layout.module.css";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,700;1,400&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
        <title>Jordan Booker</title>
        <meta
          property="og:title"
          content="A portfolio website for Jordan Booker"
          key="title"
        />
        <meta
          property="og:description"
          content="Here you can find some of the projects I'm either proud of, fond of, or unconditionally love."
        />
      </Head>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}
