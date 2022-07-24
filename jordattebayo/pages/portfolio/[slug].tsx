import { useRouter } from 'next/router'
import { Layout} from "../../components";

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
    project: Project
  }

const PortfolioPage = ( {project}: PortfolioPageProps) => {
    const router = useRouter()

    return (
        <>
        <Layout>
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
        <>
          <h1>{project.title}</h1>
          <p>{project.slug}</p>
          <p>{project.difficulties}</p>
          <p>{project.tech}</p>
          <p>{project.role}</p>
          <p>{project.solution}</p>
        </>
        )}
        </Layout>
      </>
    )
}

interface Params {
    params: {
      slug: string
    }
  }

export async function loadProject(slug: string) {
  try {
    const getProjectBySlug = await fetch(`http://localhost:3000/api/projects/${slug}`)
    console.log(getProjectBySlug.body)
    const project = await getProjectBySlug.json()
    return project;
  } catch (error){ 
    console.log(error)
    return ""
  }

}
  
export async function getStaticProps({ params }: Params) {
  const project = await loadProject(params.slug || '')
  return {
    props: {
      project,
    },
  }
}

export async function getStaticPaths() {
  try {
    const getAllProjects = await fetch("http://localhost:3000/api/projects")
    const projects = await getAllProjects.json()
    const paths = projects.map((project) => {
      return { params: { slug: project.slug.toString()}}
    })
    return {
      paths: paths,
      fallback: false,
    }

  } catch (err) {
    console.error(err)
    return { paths: [], fallback: false 
    } 
  }
}

export default PortfolioPage