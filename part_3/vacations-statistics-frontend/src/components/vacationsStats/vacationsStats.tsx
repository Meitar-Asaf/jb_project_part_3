import React, { useState, useEffect } from "react";
import { VacationsStats } from "../../models/vacationsStats/vacationsStats";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
/**
 * A React component that displays statistics about vacations in the
 * application, such as the number of past, ongoing, and future vacations.
 * The component fetches the statistics from the backend when it mounts and
 * displays them in a simple form. If the fetch fails, it displays an error
 * message. If the statistics are null, it displays a message indicating that
 * no statistics are available.
 */
const VacationsStatsComponent: React.FC = () => {
    const [stats, setStats] = useState<VacationsStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        /**
         * Fetches the vacation statistics from the backend and updates the component state.
         * If the fetch fails, sets an error message. Finally, sets loading to false.
         *
         * @async
         * @returns {Promise<void>}
         */
        const fetchStats = async (): Promise<void> => {
            try {
                const response = await axios.get<VacationsStats>(`/api/vacations/stats/`, { withCredentials: true });
                const data = response.data;
                setStats(data);
            } catch (err) {
                setError("Failed to fetch vacation statistics");
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        notyf.error(error);
        return <div>Error: {error}</div>;
    }
    if (!stats) {
        return <div>No stats available</div>;
    }
    const { pastVacations, ongoingVacations, futureVacations } = stats;
    if (pastVacations === null || ongoingVacations === null || futureVacations === null) {
        return <div>No stats available</div>;
    }
    // Prepare data for the bar chart
    const chartData = [
        { name: 'Past', value: pastVacations },
        { name: 'Ongoing', value: ongoingVacations },
        { name: 'Future', value: futureVacations },
    ];
    return (
        <div>
            <h2>Vacations Statistics</h2>
            <p>Past Vacations: {pastVacations}</p>
            <p>Ongoing Vacations: {ongoingVacations}</p>
            <p>Future Vacations: {futureVacations}</p>
            <div style={{ marginTop: 24 }}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Vacations" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VacationsStatsComponent;