import { useState } from "react"
import styles from "./projects.module.sass";
import Image from "next/image"

function ProjectCard ({ data }) {

  const [showProject, setShowProject] = useState(false)
  const [viewImage, setViewImage] = useState(false)
  const { title, image, role, difficulties, solution, features, tech, live, git, screenshots } = data
  return (
    <>
      <button
        onClick={() => setShowProject(!showProject)}
        className={showProject ? styles.btnM : styles.btn}
      >
        {title}
      </button>
      {showProject ? (
        <div className={styles.container}>
          <button onClick={() => setShowProject(!showProject)} className={styles.closeBtn}>
            Close
          </button>
          <h3 className={styles.titleText}>{title}</h3>
          <div className={styles.info}>
            <div className={styles.imgC} onClick={() => setViewImage(!viewImage)} >
              { viewImage ?
              <div className={styles.lightBoxContainer}>
                <div className={styles.lightBox}>
                  <Image
                    className={styles.proImg}
                    src={image}
                    alt="Screenshot of application"
                    layout="fill"
                  />
                </div>
              </div>
              :
              <Image
                className={styles.proImg}
                src={image}
                alt="Screenshot of application"
                width={325}
                height={275}
              />}
            </div>
            <div className={styles.textContainer}>
              <p className={styles.text}>Role: {role}</p>
              <p className={styles.text}>
                Project Difficulties: {difficulties}
              </p>
              <p className={styles.text}>My Solution: {solution}</p>
              <p className={styles.text}>Notable Features: {features}</p>
              <p className={styles.text}>Technologies Used: {tech}</p>
              <div className={styles.linkC}>
                <a
                  className={live.length > 1 ? styles.link : styles.linkCrossed}
                  href={live.length > 1 ? live : false}
                  target="_blank"
                >
                  Live
                </a>
                |
                <a
                    className={git.length > 1 ? styles.link : styles.linkCrossed}
                    href={git.length > 1 ? git : false}
                    target="_blank"
                  >
                    GitHub
                </a>
              </div>
              <div className={styles.screenshotContainer}>
                {screenshots ? (
                  <span>
                    Screenshots:{" "}
                    <a
                      className={styles.link}
                      href={screenshots.desktop}
                      download={screenshots.desktop.toString()}
                    >
                      Desktop
                    </a>|
                      <a
                      className={styles.link}
                      href={screenshots.tablet}
                      download={screenshots.tablet.toString()}
                    >
                      Tablet
                    </a>|
                    <a
                      className={styles.link}
                      href={screenshots.mobile}
                      download={screenshots.mobile.toString()}
                    >
                      Mobile
                    </a>
                  </span>
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


export default function Projects ({ projectData }) {
  return (
    <main className={styles.mainB}>
      <div className="hero-container">
        <a className={styles.link} id="projects">
          <h1 className={styles.introText}>Projects</h1>
        </a>
      </div>
      <div className={styles.pCardContainer}>
        {projectData.map((project) => {
          return <ProjectCard data={project} key={project.id} />
        })}
      </div>
    </main>
  );
}
