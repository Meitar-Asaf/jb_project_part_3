import React from 'react';
import VacationsStatsComponent from '../vacationsStats/vacationsStats';
import { TotalLikesComponent } from '../totalLikes/totalLikes';
import { LikesDistributionComponent } from '../likesDistribution/LikesDistribution';
import TotalUsersComponent from '../totalUsers/totalUsers';
import { useNavigate } from 'react-router-dom';

type StatisticsPageProps = {
    isLoggedIn: boolean;
    handleLogout: () => Promise<void>;
};

export function StatisticsPage({ isLoggedIn, handleLogout }: StatisticsPageProps) {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);
    return (
        <div className="main-grid-container">
            <div className='grid-card'>
                <VacationsStatsComponent handleLogout={handleLogout} />
            </div>
            <div className='grid-card'>
                <TotalLikesComponent handleLogout={handleLogout} />
                <LikesDistributionComponent handleLogout={handleLogout} />
            </div>
            <div className='grid-card'>
                <TotalUsersComponent handleLogout={handleLogout} />
            </div>
        </div>
    );
}

export default StatisticsPage;