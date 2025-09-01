
import React from 'react';
import './App.css';
import LogIn from './components/logIn/logIn';
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import StatisticsPage from './components/statisticsPageComponent/statisticsPageComponent';
import About from './components/about/about';
import Home from './components/home/home';
import Cookies from 'js-cookie';
import PageNotFound from './PageNotFound';

import axios from 'axios';



function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [isAuthChecked, setIsAuthChecked] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/api/users/is-authenticated/', { withCredentials: true });
                setIsLoggedIn(res.data.isAuthenticated);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setIsAuthChecked(true);
            }
        };
        checkAuth();
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate("/");
    };

    const handleNav = (path: string) => {
        setMenuOpen(false);
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout/', {}, {
                withCredentials: true,
                headers: { 'X-CSRFToken': Cookies.get('csrftoken') }
            });
            Cookies.remove('sessionid', { path: "/" });
            Cookies.remove('csrftoken', { path: "/" });
            setIsLoggedIn(false);
            setMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <nav className="navbar">
                <span className="navbar-logo" onClick={() => handleNav('/')}>Vacations Statistics</span>
                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Home</NavLink>
                    {isLoggedIn && <NavLink to="/statistics" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Statistics</NavLink>}
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>About</NavLink>
                    {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>Login</NavLink>}
                    {isLoggedIn && <button className="navbar-link-logout" onClick={handleLogout}>Logout</button>}
                </div>
                <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
            {menuOpen && (
                <div className="navbar-mobile-menu">
                    <NavLink to="/statistics" className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'} onClick={() => handleNav('/statistics')}>Home</NavLink>
                    {isLoggedIn && <NavLink to="/statistics" className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'} onClick={() => handleNav('/statistics')}>Statistics</NavLink>}
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'} onClick={() => handleNav('/about')}>About</NavLink>
                    {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? 'navbar-mobile-link active' : 'navbar-mobile-link'} onClick={() => handleNav('/login')}>Login</NavLink>}
                    {isLoggedIn && <button className="navbar-mobile-link-logout" onClick={handleLogout}>Logout</button>}
                </div>
            )}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/statistics" element={isLoggedIn ? <StatisticsPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
