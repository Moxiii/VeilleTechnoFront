import "./Home.scss"
import StyledTable from '@components/StyledTable/StyledTable.jsx';
import TechnoChart from '@components/Chart/TechnoChart/TechnoChart.jsx';
import {useUserStore} from '@store/UserStore';

export default function Home(){
const userProjects = useUserStore().userProjects;
    return (
        <div className="home">
            <h1>Overview</h1>
            <StyledTable projects={userProjects} />
            <TechnoChart projects={userProjects} />
    </div>)
}