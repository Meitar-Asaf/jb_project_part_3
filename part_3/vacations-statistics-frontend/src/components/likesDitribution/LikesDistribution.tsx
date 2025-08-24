import React, { useState, useEffect } from "react";
import { LikesDistribution } from "../../models/likesDistribution/likesDistribution";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const LikesDistributionComponent: React.FC = () => {
    const [likesDistribution, setLikesDistribution] = useState<LikesDistribution[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLikesDistribution = async () => {
            try {
                const data = await fetchWithAuth<LikesDistribution[]>(`http://localhost:8000/api/likes/distribution/`);
                setLikesDistribution(data);
            } catch (err) {
                setError("Failed to fetch likes distribution");
                notyf.error("Failed to fetch likes distribution");
            } finally {
                setLoading(false);
            }
        };
        fetchLikesDistribution();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Likes Distribution</h2>
            <ul>
                {likesDistribution.map((item) => (
                    <li key={item.country_name}>
                        {item.country_name}: {item.likes_count}
                    </li>
                ))}
            </ul>
        </div>
    );
};
