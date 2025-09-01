import React, { useState, useEffect } from "react";
import { LikesTotalCountProps } from "../../models/likesTotalCount/likesTotalCount";
import axios from "axios";
import { notyf } from "../../utils/notyf";
/**
 * A React component that displays the total number of likes.
 * The component fetches the total likes from the backend when it mounts and
 * displays them in a simple form. If the fetch fails, it displays an error
 * message. If the total likes are null, it displays a message indicating that
 * no total likes are available.
 */
export const TotalLikesComponent: React.FC = () => {
    const [totalLikes, setTotalLikes] = useState<LikesTotalCountProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetches the total number of likes from the backend and updates the component state.
         * If the fetch fails, sets an error message and notifies the user.
         *
         * @async
         * @returns {Promise<void>}
         */
        const fetchTotalLikes = async (): Promise<void> => {
            try {
                const response = await axios.get<LikesTotalCountProps>("/api/likes/total/", { withCredentials: true });
                const data = response.data;
                setTotalLikes(data);
            } catch (err) {
                notyf.error("Failed to fetch total likes");
                setError("Failed to fetch total likes");
            } finally {
                setLoading(false);
            }
        };
        fetchTotalLikes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <p>{totalLikes?.total_likes === undefined || totalLikes?.total_likes === null || totalLikes === null ? "No likes available" : <><h2>Total likes:</h2> {totalLikes.total_likes}</>}</p>
        </div>
    );
}
