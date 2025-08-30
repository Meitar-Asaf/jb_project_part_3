import React, { useEffect, useState } from "react";
import { TotalUsers } from "../../models/totalUsers/totalUsers";
import axios from "axios";
import { notyf } from "../../utils/notyf";

/**
 * A React component that displays the total number of users.
 *
 * The component fetches the total users from the backend when it mounts and
 * displays them in a simple form. If the fetch fails, it displays an error
 * message. If the total users are null, it displays a message indicating that
 * no total users are available.
 */
const TotalUsersComponent: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState<TotalUsers | null>(null);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get<TotalUsers>("/api/users/total/", { withCredentials: true });
                const data = response.data;
                setTotalUsers(data);
            } catch (error) {
                notyf.error("Failed to fetch total users");
            }
        };

        fetchTotalUsers();
    }, []);

    return (
        <div>
            <h2>Total Users</h2>
            <p>{totalUsers?.totalUsers}</p>
        </div>
    );
};

export default TotalUsersComponent;
