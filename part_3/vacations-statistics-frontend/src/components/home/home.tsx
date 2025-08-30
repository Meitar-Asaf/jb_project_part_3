import React from 'react';
const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="home-bg-overlay">
                <div className="home-content">
                    <h1>Vacations Statistics Project</h1>
                    <p>
                        Welcome to my final project for the Python Full Stack course at John Bryce College.<br />
                        This web application allows you to explore and analyze vacation data from  <a href="http://localhost:8080">my vacations website</a>.
                    </p>
                    <ul className="home-stats-list">
                        <li><strong>Total Likes:</strong> See the total number of likes for all vacations.</li>
                        <li><strong>Likes Distribution:</strong> View a chart showing how likes are distributed across different destinations.</li>
                        <li><strong>Vacations Statistics:</strong> Explore various statistics and insights about the vacations in the system.</li>
                        <li><strong>Total Users:</strong> See how many users are registered in the system.</li>
                    </ul>
                    <p className="home-author">Created by Meitar Asaf, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
