import "./Navbar.scss"
import Underline from "../../Effects/Underline/Underline.jsx"
import links from "../../CONST/_const.ts"
import {NavLink} from "react-router-dom";
import {useAuthContext} from "../../Context/Auth/AuthContext.tsx"
export default function Navbar() {
  const { isAuth } = useAuthContext();
  return (
    <div className="navbar">
      <nav>

        <NavLink exact="true" to={links.home} activeclassname="active">
          <Underline label={"Home"} />
        </NavLink>
        <NavLink exact="true" to={links.tools} activeclassname="active">
          <Underline label={"Tools"} />
        </NavLink>
        <NavLink exact="true" to={links.ressources} activeclassname="active">
          <Underline label={"Ressources"} />
        </NavLink>
          <NavLink exact="true" to={links.ideas} activeclassname="active">
            <Underline label={"Ideas"} />
          </NavLink>
        {isAuth? (
            <NavLink to={links.auth.profile} activeclassname="active">
              <Underline label={"Profile"} />
            </NavLink>
        ):(
            <NavLink to={links.auth.login} activeclassname="active">
              <Underline label={"Login"} />
            </NavLink>
        )}
      </nav>
    </div>
  );
}