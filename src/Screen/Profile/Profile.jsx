import "./Profile.scss"
import {useUserStore} from "@store/UserStore";
import {useProjectStore} from "@store/ProjectStore";
import {useTechnologyStore} from "@store/TechnologyStore";
import{useRessourcesStore} from "@store/RessourcesStore";

import {useAuthStore} from "@store/AUTH/AuthStore";

import StatCard from "@components/Card/StatCard/StatCard"
import BarChart from "@components/Chart/BarChart/BarChart.jsx";
import {useItemsPerMonth} from "@hook/memo/useItemPerMonth.js";

import {useNavigate} from "react-router-dom";

export default function Profile() {


    const userData = useUserStore((state) => state.userData);
    const userProjects = useProjectStore((state)=>state.projects);
    const userRessources = useRessourcesStore((state)=>state.ressources);
    const userTechnology = useTechnologyStore((state)=>state.technology);
    const logout = useAuthStore((state)=>state.logout);
    const navigate = useNavigate();
    const handleclick = async () =>{
       logout();
       navigate("/");

    }
    const totalProjects = userProjects.length;
    const totalRessources = userRessources.length;
    const totalTechnology = userTechnology.length;
    const projectStats = useItemsPerMonth(userProjects);
    const techStats = useItemsPerMonth(userTechnology);
    const ressourcesStats = useItemsPerMonth(userRessources);
  return (
    <div className="profile">
   <h1>Profile</h1>
        {userData && (
            <>
                <p>Hello {userData.username} !</p>
                <div className="stat project">
                    <StatCard label="Projets" value={totalProjects} />
                    <BarChart name="Projets par mois" label="Projects" value={projectStats} />
                </div>
                <div className="stat tech">
                    <StatCard label="Technologies" value={totalTechnology} />
                    <BarChart name="Technology par mois" label="Technology" value={techStats} />
                </div>
                <div className="stat ressources">
                    <StatCard label="Ressources" value={totalRessources} />
                    <BarChart name="Ressources par mois" label="Ressources" value={ressourcesStats} />
                </div>
                <button onClick={handleclick}>Logout</button>
        </>
        )}

    </div>
  );
}