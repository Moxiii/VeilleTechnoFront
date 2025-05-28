export async function checkAuth(setIsAuth: (auth: boolean) => void){
        try {
            const res = await fetch("http://localhost:8080/api/auth/status", {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            setIsAuth(false);
        }}
