import { Layout, ProjectCard, StyledAnimatedTest }from '../components'
import styled from "styled-components";
import Project from '../interfaces/project'
import Hero from '../components/hero'

/* Todo 
    - Add cms to blog for formatting support of codeblocks and rich text
    - Integrate react spring for animations on homepage
    - Update styles for portfolio cards
    - Style PortfolioPage
    - Rewrite some of the project descriptions
 */

const ProjectsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
`
interface PortfolioPageProps  {
  projects: Array<Project>
}

export default function Home( { projects }: PortfolioPageProps) {

  return (
    <Layout>
      <main>
      <Hero />
      <ProjectsWrapper>
        {projects.map((project) => {
          return <ProjectCard key={project.id} data={project}/>
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