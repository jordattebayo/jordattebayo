import { Layout, ProjectCard }from '../components'
import styled from "styled-components";

const ProjectsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
`

interface Project {
  id: string;
  slug: string;
  title: string;
  image: string;
  role: string;
  difficulties: string;
  solution: string;
  features: string;
  tech: string;
  live: string;
  git: string;
  screenshots?: any;
}

interface PortfolioPageProps  {
  projects: Array<Project>
}

export default function Home( { projects }: PortfolioPageProps) {

  return (
    <Layout>
      <main>
      <ProjectsWrapper>
        {projects.map((project) => {
          return <ProjectCard data={project} key={project.id} />
        })}
      </ProjectsWrapper>
      </main>
    </Layout>
  )
}

export async function loadProjects() {
  try {
    const getAllProjects = await fetch(`http://localhost:3000/api/projects`)
    const projects = await getAllProjects.json()
    return projects;
  } catch (error){ 
    console.log(error)
    return ""
  }
}

export async function getStaticProps() {
  const projects = await loadProjects()
  return {
    props: {
      projects,
    },
  }
}