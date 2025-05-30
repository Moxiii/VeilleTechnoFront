import "./Navbar.scss"
import Underline from "../../Effects/Underline/Underline.jsx"
import links from "../../CONST/_const.ts"
import {NavLink} from "react-router-dom";
import {useAuthContext} from "../../DATA/Context/Auth/AuthContext.tsx"
export default function Navbar() {
  const { isAuth } = useAuthContext();
  const authLinks = [
    { path: links.home, label: "Home" },
    { path: links.technology, label: "Technology" },
    { path: links.ressources, label: "Ressources" },
    { path: links.ideas, label: "Ideas" },
    { path: links.auth.profile, label: "Profile" },
  ];
  const guestLinks = [
    { path: links.about, label: "About" },
    { path: links.auth.login, label: "Login" },
    { path: links.auth.register, label: "Register" },

  ];
  return (
    <div className="navbar">
      <nav>
        {(isAuth ? authLinks : guestLinks).map((link) => (
            <NavLink key={link.path} to={link.path} className={({isActive})=>isActive ? "active" : ""}>
              <Underline label={link.label} />
            </NavLink>
        ))}
      </nav>
    </div>
  );
}