import "./Home.scss"
import StyledTable from "../../Components/StyledTable/StyledTable.jsx";
import TechnoChart from "../../Components/Chart/TechnoChart/TechnoChart.jsx";

export default function Home(){
    const projects = [
        {
            id: 1,
            name: "Projet MESI",
            startDate: "2024-01-10",
            endDate: "En cours",
            technology: ["React Native", "Java"],
            status: "En développement",
            links: [
                { label: "GitHub", url: "https://github.com/mon-compte/mesi" },
                { label: "Démo", url: "https://mesi-demo.com" },
            ],
        },
        {
            id: 2,
            name: "Outil veille tech",
            startDate: "2024-03-05",
            endDate: "En cours",
            technology: ["React", "Java" , "Framer" , "ChartJS" , "Gsap"],
            status: "Prototype",
            links: [{ label: "GitHub", url: "https://github.com/mon-compte/veille-tech" }],
        },
        {
            id: 3,
            name: "Portfolio",
            startDate: "2024-03-05",
            endDate: "En cours",
            technology: ["React" , "Three.js", "Gsap"],
            status: "En cours",
            links: [{ label: "GitHub", url: "https://github.com/mon-compte/veille-tech" }],
        },
    ];
    return (
        <div className="home">
            <h1>Overview</h1>
            <StyledTable projects={projects} />
            <TechnoChart projects={projects} />
    </div>)
}