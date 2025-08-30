import React, { useState, useEffect } from "react";
import { LikesTotalCountProps } from "../../models/likesTotalCount/likesTotalCount";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { GeneralProps } from "../likesDistribution/LikesDistribution";
export const TotalLikesComponent: React.FC<GeneralProps> = ({ handleLogout }) => {
    const [totalLikes, setTotalLikes] = useState<LikesTotalCountProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTotalLikes = async () => {
            try {
                const response = await axios.get<LikesTotalCountProps>("http://localhost:8000/api/likes/total/", { withCredentials: true });
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
            <p>{totalLikes?.total_likes === undefined || totalLikes?.total_likes === null || totalLikes === null ? "No likes available" : `Total likes: ${totalLikes.total_likes}`}</p>
        </div>
    );
}
