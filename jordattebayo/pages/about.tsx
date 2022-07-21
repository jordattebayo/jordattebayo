import Layout from "../components/Layout";
import ContactButton from "../components/ContactButton";

export default function About() {

  return (
    <Layout>
      <main className="grid">
        <div className="hero-container">
          <h1 className="hero-heading">About</h1>
          <div className="hero-subheading--container">
            <p className="hero-subheading">
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
