import { useAuthStore } from "@src/DATA/Store/AUTH/AuthStore";
import Home from "@screen/Home/Home.jsx";
import About from "@screen/About/About.jsx";
export default function HomeRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return isAuth ? <Home /> : <About />;
}
