import React, { useState, useEffect } from "react";
import { LikesTotalCountProps } from "../../models/likesTotalCount/likesTotalCount";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const TotalLikesComponent: React.FC = () => {
    const [totalLikes, setTotalLikes] = useState<LikesTotalCountProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalLikes = async () => {
            try {
                const data = await fetchWithAuth<LikesTotalCountProps>("http://localhost:8000/api/likes/total/");
                setTotalLikes(data);
            } catch (err) {
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
            <p>{totalLikes?.total_likes === undefined || totalLikes?.total_likes === null || totalLikes === null ? "No likes available" : `Total likes: ${totalLikes.total_likes}`}</p>
        </div>
    );
}
