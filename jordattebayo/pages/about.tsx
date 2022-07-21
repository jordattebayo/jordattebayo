import { useSpring, animated, config } from "react-spring"

import Layout from "../components/Layout";
import ThemeShape from "../components/ThemeShape";
import ContactButton from "../components/ContactButton";

export default function About() {
  const props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0}, 
    config: config.molasses,
    delay: 200,
  })

  const props2 = useSpring({
    to: {opacity: 1},
    from: {opacity: 0}, 
    config: config.molasses,
    delay: 500, 
  })

  return (
    <Layout>
      <main className="grid">
        <div className="hero-container">
          <animated.h1 style={props} className="hero-heading">About</animated.h1>
          <div className="hero-subheading--container">
            <animated.p style={props2} className="hero-subheading">
              I am Frontend Web Developer with Full Stack dreams. I love so much
              about the web and want to do my best in building it out further into
              the unknown.
              <br/><br/>
              My objective is to create thoughtful, long lasting, and inclusive web
              applications that help users share knowledge. If you have questions or
              would like to learn more about me, please reach out!
            </animated.p>
          </div>
        </div>
        <ContactButton />
        {/* <ThemeShape /> */}
      </main>
    </Layout>
  );
}
