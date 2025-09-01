import React, { useState, useEffect } from "react";
import { LikesDistribution } from "../../models/likesDistribution/likesDistribution";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * A React component that displays the distribution of likes among countries.
 *
 * The component fetches the likes distribution from the backend when it mounts and
 * displays them in a simple form. If the fetch fails, it displays an error
 * message. If the likes distribution is null, it displays a message indicating that
 * no likes distribution is available.
 */

export const LikesDistributionComponent: React.FC = () => {
    const [likesDistribution, setLikesDistribution] = useState<LikesDistribution[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetches the likes distribution from the backend and updates the component state.
         * If the fetch fails, sets an error message and notifies the user.
         *
         * @async
         * @returns {Promise<void>}
         */
        const fetchLikesDistribution = async (): Promise<void> => {
            try {
                const response = await axios.get<LikesDistribution[]>(`/api/likes/distribution/`, { withCredentials: true });
                const data = response.data;
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
            <div style={{ marginTop: 24 }}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={likesDistribution}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country_name" interval={0} angle={-30} textAnchor="end" minTickGap={5} height={70} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="likes_count" name="Likes" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
