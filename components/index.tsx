import { ContactButton } from "./contact";
import BlogLayout from "./blog-layout";
import Layout from "./layout"
import Navbar from "./navbar";
import ProjectCard from "./project-card";
import Footer from "./footer";
import GlobalStyle from "./global-styles";
import StyledAnimatedTest from "./styled-animation-test";
import ThemeShape from "./theme-shape";

interface Content {
    type: string;
    value: string;
}

function timeToReadCalculator(contentArray: Array<Content>) {
    const wpm = 125;
    const textConentArray = contentArray.filter(({ type }) => type === "text")
    const textArray = Array.from(textConentArray,({value}) => value)
    const text = textArray.join()
    const words = text.trim().split(" ").length;
    return Math.ceil(words / wpm);
}

export {
    ContactButton,
    Layout,
    BlogLayout,
    Navbar,
    ProjectCard,
    Footer,
    GlobalStyle,
    timeToReadCalculator,
    StyledAnimatedTest,
    ThemeShape
}
