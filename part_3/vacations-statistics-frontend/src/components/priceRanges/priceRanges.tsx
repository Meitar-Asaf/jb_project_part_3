import React, { useState, useEffect } from "react";
import { PriceRanges } from "../../models/priceRanges/priceRanges";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * A React component that displays the count of vacations in different price ranges.
 * The component fetches the counts from the backend when it mounts and displays
 * them in a simple form. If the fetch fails, it displays an error message.
 * If the counts are null, it displays a message indicating that no counts are
 * available.
 */
const PriceRangesComponent: React.FC = () => {
    const [priceRanges, setPriceRanges] = useState<PriceRanges | null>(null);

    useEffect(() => {
        /**
         * Fetches the count of vacations in different price ranges from the backend and updates the component state.
         *
         * @async
         * @returns {Promise<void>}
         */
        const fetchPriceRanges = async (): Promise<void> => {
            const response = await axios.get<PriceRanges>("/api/vacations/price_range", { withCredentials: true });
            setPriceRanges(response.data);
        };

        fetchPriceRanges();
    }, []);

    if (!priceRanges) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Vacation Price Ranges</h2>
            <ul>
                {Object.entries(priceRanges).map(([range, count]) => (
                    <li key={range}>
                        {range}: {count}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: 24 }}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={Object.entries(priceRanges).map(([range, count]) => ({ range, count }))}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" interval={0} angle={-30} textAnchor="end" minTickGap={5} height={70} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceRangesComponent;
