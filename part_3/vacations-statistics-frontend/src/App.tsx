import React from 'react';
import './App.css';
import VacationsStatsComponent from './components/vacationsStats/vacationsStats';
import { TotalLikesComponent } from './components/totalLikes/totalLikes';
import { LikesDistributionComponent } from './components/likesDitribution/LikesDistribution';
import LogIn from './components/logIn/logIn';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('access'));
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    if (!isLoggedIn) {
        return <LogIn onLoginSuccess={handleLoginSuccess} />;
    }
    
    return (
        <div className="App">
            <VacationsStatsComponent />
            <TotalLikesComponent />
            <LikesDistributionComponent />
        </div>
    );
}

export default App;
