import React, { useEffect, useState } from "react";
import { TotalUsers } from "../../models/totalUsers/totalUsers";
import axios from "axios";
import { notyf } from "../../utils/notyf";
import { GeneralProps } from "../likesDistribution/LikesDistribution";

const TotalUsersComponent: React.FC<GeneralProps> = ({ handleLogout }) => {
    const [totalUsers, setTotalUsers] = useState<TotalUsers | null>(null);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get<TotalUsers>("http://localhost:8000/api/users/total/", { withCredentials: true });
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
