import React from 'react';

import VacationsStatsComponent from '../vacationsStats/vacationsStats';
import { TotalLikesComponent } from '../totalLikes/totalLikes';
import { LikesDistributionComponent } from '../likesDistribution/LikesDistribution';
import TotalUsersComponent from '../totalUsers/totalUsers';
import { useNavigate } from 'react-router-dom';
import PriceRangesComponent from '../priceRanges/priceRanges';

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
                <VacationsStatsComponent />
            </div>
            <div className='grid-card'>
                <TotalLikesComponent />
            </div>
            <div className='grid-card'>
                <LikesDistributionComponent />
            </div>
            <div className='grid-card'>
                <TotalUsersComponent />
            </div>
            <div className='grid-card'>
                <PriceRangesComponent />
            </div>
        </div>
    );
}

export default StatisticsPage;