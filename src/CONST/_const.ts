 const links = {
     home:"/",
     technology:"/technology",
     ressources:"/ressources",
     ideas:"/ideas",
     about:"/about",
     auth:{
        login:"/login",
         logout:"/logout",
         profile:"/profile",
         register:"/register",
     }
}
 export default links;
// @ts-ignore
 export function getBaseUrl(): string {
     // @ts-ignore
     if (import.meta.env.VITE_API_URL) {
         // @ts-ignore
         return import.meta.env.VITE_API_URL;
     }
     const hostname = window?.location?.hostname;

     if (hostname === "localhost") {
         return "http://localhost:8080";
     }

     // @ts-ignore
     if (hostname.endsWith(".localhost")) {
         return "http://api.localhost";
     }

     return window.location.origin;
 }
