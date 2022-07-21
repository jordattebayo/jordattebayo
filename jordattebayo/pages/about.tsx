import { ContactButton, Layout } from "../components";


export default function About() {

  return (
    <Layout>
      <main >
        <div >
          <h1>About</h1>
          <div>
            <p>
              I am Frontend Web Developer with Full Stack dreams. I love so much
              about the web and want to do my best in building it out further into
              the unknown.
              <br/><br/>
              My objective is to create thoughtful, long lasting, and inclusive web
              applications that help users share knowledge. If you have questions or
              would like to learn more about me, please reach out!
            </p>
          </div>
        </div>
        <ContactButton />
      </main>
    </Layout>
  );
}
