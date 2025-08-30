import React, { useState, useEffect } from "react";
import { VacationsStats } from "../../models/vacationsStats/vacationsStats";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { GeneralProps } from "../likesDistribution/LikesDistribution";

/**
 * A React component that displays statistics about vacations in the
 * application, such as the number of past, ongoing, and future vacations.
 * The component fetches the statistics from the backend when it mounts and
 * displays them in a simple form. If the fetch fails, it displays an error
 * message. If the statistics are null, it displays a message indicating that
 * no statistics are available.
 */
const VacationsStatsComponent: React.FC<GeneralProps> = ({ handleLogout }) => {
    const [stats, setStats] = useState<VacationsStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get<VacationsStats>(`http://localhost:8000/api/vacations/stats/`, { withCredentials: true });
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
    return (
        <div>
            <h2>Vacations Statistics</h2>
            <p>Past Vacations: {pastVacations}</p>
            <p>Ongoing Vacations: {ongoingVacations}</p>
            <p>Future Vacations: {futureVacations}</p>
        </div>
    );
};

export default VacationsStatsComponent;