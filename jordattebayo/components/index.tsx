import { ContactButton } from "./shared";
import Layout from "./Layout";
import Navbar from "./Navbar";
import ProjectCard from "./projectcard";
import Footer from "./Footer";
import GlobalStyle from "./globalstyles";
import Resume from "./Resume";

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
    Navbar,
    ProjectCard,
    Footer,
    GlobalStyle,
    Resume,
    timeToReadCalculator
}
