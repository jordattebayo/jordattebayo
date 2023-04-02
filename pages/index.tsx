import { Layout, ProjectCard, StyledAnimatedTest, ThemeShape }from '../components'
import styled from "styled-components";
import Project from '../interfaces/project'
import Hero from '../components/hero'

/* Todo 
    - refactor layout to allow for each section to span full length of page
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
  margin: 0 auto;
  background-color: ${({theme}) => theme.colors.primary};
`

const projects: Project[] = [
  {
    id: "0",
    slug: "amplifier-creative",
    title: "Amplifier Creative",
    image: {
      "placeholder": "Amplifier Creative's website",
      "dimensions": {
        "width": "620",
        "height": "358"
      }
    },
    role: "Developer",
    difficulties: "Creating a meaningful user interface with animations and unique scroll experiences",
    solution: "Used a combination of research and trial and error to develop a from scratch solution",
    features: "Complete website with CMS integration",
    tech: "JavaScript, ReactJS, GraphQL, Gatsby, Netlify CMS",
    live: "https://amplifiercreative.com",
    git: "https://github.com/AmplifierCreative/website"
  },
  {
    id: "1",
    slug: "slate",
    title: "React Line Chart for Slate.host",
    image:  {
      placeholder: "An SVG Line Chart",
      dimensions: {
        width: "384",
        height: "358"
      }
    },
    role: "Developer",
    difficulties: "Creating logic to graphically represent differences in dynamically loaded content",
    solution: "Use a variety of sorting functions and algorithms to parse incoming data using as few fixed numbers as possible",
    features: "Dynamically builds line chart",
    tech: "JavaScript, React, Emotion",
    live: "https://slate.host/_/system/line-chart",
    git: "https://github.com/filecoin-project/slate/tree/main/components/stats"
  },
  {
    id: "2",
    slug: "travel-planner-app",
    title: "Travel Planner App",
    image:  {
      placeholder: "A gif of the travel planner app being used",
      dimensions: {
        width: "473",
        height: "409"
      }
    },
    role: "Developer",
    difficulties: "API calls dependent on other API calls",
    solution: "Utilize local storage and a set timeout function to store data and run subsequent API calls",
    features: "Local storage paired with service workers to hold planned data even after user exits the browser",
    tech: "HTML, SASS, JavaScript, NodeJs, ExpressJS, Webpack, Babel",
    live: "http://jordattebayos-travel-planner.herokuapp.com/",
    git: "https://github.com/jordattebayo/Travel-Planner-App"
  },
  {
    id: "3",
    slug: "lee",
    title: "Lee® Indigood",
    image:  {
      placeholder: "A mockup of a Lee Webpage",
      dimensions: {
        width: "600",
        height: "408"
      }
    },
    role: "Developer",
    difficulties: "Creating responsive layouts between mobile, tablet, and desktop views.",
    solution: "Using Bootstrap's grid system to create responsive layouts based on popular viewport breakpoints.",
    features: "Responsive layout",
    tech: "Bootstrap, Salesfoce Commerce Cloud, HTML, CSS",
    live: "",
    git: ""
  },
  {
    id: "4",
    slug: "news",
    title: "Evaluate News NLP",
    image:  {
      placeholder: "A small news api integration app",
      dimensions: {
        width: "540",
        height: "347"
      }
    },
    role: "Developer",
    difficulties: "Making sure that text submitted was valid to pass along to Aylien API",
    solution: "Used regular expressions and JavaScript uri methods to validate text",
    features: "Uses language processing to provide feedback on statements submitted",
    tech: "HTML, SASS, JavaScript, NodeJs, ExpressJS, Webpack",
    live: "",
    git: "https://github.com/jordattebayo/fend/tree/refresh-2019/projects/evaluate-news-nlp"
  },
  {
    id: "5",
    slug: "photo-blog",
    title: "Photo Blog",
    image:  {
      placeholder: "A sample photo blog",
      dimensions: {
        width: "420",
        height: "350"
      }
    },
    role: "Developer",
    difficulties: "Layout and design of photos within article",
    solution: "Utilized large size photos to pause the reader while still showing some text to indicate there is more to read.",
    features: "General layout for posts and home page",
    tech: "HTML, CSS",
    live: "",
    git: "https://github.com/jordattebayo/Udacity-Blog-Project"
  }
]

export default function Home({ setSelectedTheme }) {
  return (
    <>
    <Layout updateTheme={setSelectedTheme}>
      <main>
      <Hero />
      <ThemeShape bottomAligned/>
      <ProjectsWrapper id="portfolio">
        {projects.map((project) => {
          return <ProjectCard key={project.id} data={project}/>
        })}
      </ProjectsWrapper>
      </main>
    </Layout>
    </>
  )
}
