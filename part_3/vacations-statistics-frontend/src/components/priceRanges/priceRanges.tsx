import React, {useState, useEffect} from "react";
import { PriceRanges } from "../../models/priceRanges/priceRanges";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PriceRangesComponent: React.FC = () => {
    const [priceRanges, setPriceRanges] = useState<PriceRanges | null>(null);

    useEffect(() => {
        const fetchPriceRanges = async () => {
            const response = await axios.get<PriceRanges>("/api/vacations/price-range/");
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
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={Object.entries(priceRanges).map(([range, count]) => ({ range, count }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceRangesComponent;
