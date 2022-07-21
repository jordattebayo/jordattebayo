import { useState } from "react";
import Image from "next/image";

function ProjectCard ({ data }) {

  const [showProject, setShowProject] = useState(false)
  const [viewImage, setViewImage] = useState(false)
  const { title, image, role, difficulties, solution, features, tech, live, git, screenshots } = data
  
  return (
    <>
      <button
        onClick={() => setShowProject(!showProject)}
      >
        {title}
      </button>
      {showProject ? (
        <div >
          <button onClick={() => setShowProject(!showProject)}>
            Close
          </button>
          <h3 >{title}</h3>
          <div>
            <div onClick={() => setViewImage(!viewImage)} >
              { viewImage ?
              <div>
                <div>
                  <Image
                    src={image}
                    alt="Screenshot of application"
                    layout="fill"
                  />
                </div>
              </div>
              :
              <Image
                src={image}
                alt="Screenshot of application"
                width={325}
                height={275}
              />}
            </div>
            <div>
              <p>Role: {role}</p>
              <p>
                Project Difficulties: {difficulties}
              </p>
              <p>My Solution: {solution}</p>
              <p>Notable Features: {features}</p>
              <p>Technologies Used: {tech}</p>
              <div>
                <a
                  href={live.length > 1 ? live : false}
                  target="_blank"
                >
                  Live
                </a>
                |
                <a
                    href={git.length > 1 ? git : false}
                    target="_blank"
                  >
                    GitHub
                </a>
              </div>
              <div>
                {screenshots ? (
                  <span>
                    Screenshots:{" "}
                    <a
                      href={screenshots.desktop}
                      download={screenshots.desktop.toString()}
                    >
                      Desktop
                    </a>|
                      <a
                      href={screenshots.tablet}
                      download={screenshots.tablet.toString()}
                    >
                      Tablet
                    </a>|
                    <a
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
/*   const data = JSON.parse(projectData) */
  const data = projectData
  return (
    <main >
      <div className="hero-container">
        <a id="projects">
          <h1 >Projects</h1>
        </a>
      </div>
      <div>
        {data.map((project) => {
          return <ProjectCard data={project} key={project.id} />
        })}
      </div>
    </main>
  );
}
