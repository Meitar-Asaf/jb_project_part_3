import axios from "axios";

/**
 * Makes a GET request to the given URL with the current access token.
 * If the request fails with a 401 status code, it attempts to refresh the access token
 * and retries the request. If the refresh attempt fails, it throws an error with a message
 * indicating that the user needs to log in again.
 * @param url The URL to make the request to
 * @returns The response data
 */
export async function fetchWithAuth<T>(url: string): Promise<T> {
    let access = localStorage.getItem("access");
    let refresh = localStorage.getItem("refresh");

    try {
        // מנסה עם ה-access token הנוכחי
        const response = await axios.get<T>(url, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${access}` },
        });
        return response.data;
    } catch (error: any) {
        // אם קיבלנו 401, מנסה לרענן את הטוקן
        if (error.response && error.response.status === 401 && refresh) {
            try {
                const refreshRes = await axios.post("http://localhost:8000/api/users/token/refresh/", { refresh });
                localStorage.setItem("access", refreshRes.data.access);
                // מנסה שוב עם הטוקן החדש
                const retryRes = await axios.get<T>(url, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${refreshRes.data.access}` },
                });
                return retryRes.data;
            } catch (refreshError) {
                throw new Error("Session expired, please login again.");
            }
        }
        throw error;
    }
}
