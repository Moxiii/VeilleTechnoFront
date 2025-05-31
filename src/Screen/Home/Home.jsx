import "./Home.scss"
import StyledTable from "../../Components/StyledTable/StyledTable.jsx";
import TechnoChart from "../../Components/Chart/TechnoChart/TechnoChart.jsx";
import {useUserStore} from "../../DATA/Store/UserStore";

export default function Home(){
const userProjects = useUserStore().userProjects;
    return (
        <div className="home">
            <h1>Overview</h1>
            <StyledTable projects={userProjects} />
            <TechnoChart projects={userProjects} />
    </div>)
}