import Layout from '../components/Layout'
import Resume from '../components/Resume'
import ContactButton from '../components/ContactButton'
import Projects from '../components/Projects'
import _projectData from "../public/projects.json"

export default function Home() {

  return (
    <Layout>
      <main className='grid'>
        <div>
          <div className='hero-container'>
            <h1 className='hero-heading'>
              Hello
            </h1>
            <div className='hero-subheading--container'>
              <p  className='hero-subheading'>
                My name is Jordan, I'm a Frontend Web Developer. <br />
                <br /> My big dream is to create thoughtful, inclusive, and
                durable web applications that help people. Feel free to check
                out some of my projects I've made below.
              </p>
            </div>
          </div>
          <ContactButton />
        </div>
        <Projects projectData={_projectData.projects} />
        <Resume />
      </main>
    </Layout>
  )
}
