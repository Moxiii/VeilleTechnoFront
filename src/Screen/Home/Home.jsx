import "./Home.scss"
import StyledTable from "../../Components/StyledTable/StyledTable.jsx";
import TechnoChart from "../../Components/Chart/TechnoChart/TechnoChart.jsx";
import {useUserData} from "../../DATA/Context/UserContext";
export default function Home(){
    const {userProjects}= useUserData();

    return (
        <div className="home">
            <h1>Overview</h1>
            <StyledTable projects={userProjects} />
            <TechnoChart projects={userProjects} />
    </div>)
}