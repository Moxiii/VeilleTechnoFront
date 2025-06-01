
import { useConfigStore } from "@store/ConfigStore";

export async function initBaseUrl(): Promise<void> {
    const { baseUrl , setBaseUrl} = useConfigStore.getState();
    if(baseUrl) {return }
    const envUrl = import.meta.env.VITE_API_URL?.trim();
    const hostname = window.location.hostname;
    let fallbackUrl = hostname === "localhost"
        ? "http://localhost:8080"
        : window.location.origin;

    try {
        if (envUrl && !envUrl.includes("undefined")) {
            const res = await fetch(`${envUrl}/api/auth/status`, { method: "GET", credentials: "include" });
            if (res.ok) {
                setBaseUrl(envUrl);
                return;
            } else {
                console.warn("Env URL fetch failed, falling back to localhost");
                setBaseUrl(fallbackUrl);
            }
        }
    } catch (e) {
        console.warn("⚠️ Env URL unreachable, fallback will be used:", fallbackUrl);
    }
    setBaseUrl(fallbackUrl);


}
export function getBaseUrl():string{
    const baseUrl = useConfigStore.getState().baseUrl;
    return baseUrl;
}