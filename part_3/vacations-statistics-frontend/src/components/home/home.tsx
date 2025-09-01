import React from 'react';
/**
 * The Home component is the landing page of the application. It provides
 * some general information about the project and a list of features that
 * can be found in the application.
 */

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="home-bg-overlay">
                <div className="home-content">
                    <h1>Vacations Statistics Project</h1>
                    <p>
                        Welcome to my final project for the Python Full Stack course at John Bryce College.<br />
                        This web application allows you to explore and analyze vacation data from  <a href={process.env.REACT_APP_VACATIONS_URL || "http://main_nginx:81/"}>my vacations website</a>.
                    </p>
                    <ul className="home-stats-list">
                        <li><strong>Total Likes:</strong> See the total number of likes for all vacations.</li>
                        <li><strong>Likes Distribution:</strong> View a chart showing how likes are distributed across different destinations.</li>
                        <li><strong>Vacations Statistics:</strong> Explore various statistics and insights about the vacations in the system.</li>
                        <li><strong>Total Users:</strong> See how many users are registered in the system.</li>
                        <li><strong>Price Ranges:</strong> See how vacations count in different price ranges.</li>
                    </ul>
                    <p className="home-author">Created by Meitar Asaf, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
