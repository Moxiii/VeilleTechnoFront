import {FetchTypes} from "@src/DATA/Type/FetchTypes";

export const handleResponse = async (response:Response,  options?:FetchTypes) => {
    const contentType = response.headers.get("Content-Type") || "";
    const status = response.status;
    if (status == 204) {
        return {ok:true}
    }
    if (!response.ok) {
        let errorMessage = `HTTP ${status}`;
        try {
            if (contentType?.includes("application/json")) {
                const errJson = await response.json();
                errorMessage = errJson.message || JSON.stringify(errJson);
            }else {
                const text = await response.text();
                errorMessage = text.slice(0, 200);
        }
    } catch (_) {}
        throw new Error(errorMessage);

    }
    if (contentType?.includes("application/json")) {
        return await response.json();
    }
    if(contentType?.includes("application/pdf")){
        const blob = await response.blob();
        if(options.download){
            const url = URL.createObjectURL(blob);
            const username = options.username || "report";
            const today = new Date().toISOString().split("T")[0];
            const filename = `${username} - ${today}.pdf`;
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);
            return { ok: true, filename };
        }
            return blob;
    }
  throw new Error(`Unsupported contentType: ${contentType}`);
};