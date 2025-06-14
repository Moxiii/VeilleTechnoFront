export function readCookie(name:string):string|undefined {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

export function writeSessionCookie(name:string, value:string , maxAge = 3600) {
    document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}