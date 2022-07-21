import { Layout, Resume, Projects }from '../components'
import _projectData from "../public/projects.json"

export default function Home() {

  return (
    <Layout>
      <main>
        <Projects projectData={_projectData.projects} />
        <Resume />
      </main>
    </Layout>
  )
}
