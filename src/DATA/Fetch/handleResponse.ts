export const handleResponse = async (response) => {
    const contentType = response.headers.get("Content-Type");

    const text = await response.text();
    const deleteStatus = response.status === 204;
    if (!response.ok && !deleteStatus) {
        let errorMessage = "An error occurred";
        if (contentType?.includes("application/json")) {
            try {
                const error = JSON.parse(text);
                errorMessage = error.message || errorMessage;
            } catch (_) {
            }
        } else {
            errorMessage = `Unexpected error: ${text.slice(0, 200)}`;
        }
        throw new Error(errorMessage);
    }
    if (!contentType?.includes("application/json")) {
        if(deleteStatus){
            return {ok:true}
        } else {
            console.error("❌ Unexpected Content-Type for successful response:", contentType);
            throw new Error("Expected JSON but received something else");
        }
    }
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("❌ Failed to parse JSON:", e, "\nRaw response:\n", text);
        throw e;
    }
};