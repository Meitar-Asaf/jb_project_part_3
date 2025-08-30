import React, { useState } from 'react';
import axios from 'axios';
import { notyf } from '../../utils/notyf';

type LogInProps = {
    onLoginSuccess: () => void;
};
const LogIn = ({ onLoginSuccess }: LogInProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles a login attempt by sending a POST request to the backend's
     * /login/ endpoint. If the request is successful, it displays a success
     * notification and calls the onLoginSuccess callback. If the request fails,
     * it displays an error notification with the error message from the
     * response if available, or a generic error message.
     */
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "/api/users/login/",
                { username, password },
                { withCredentials: true }
            );
            notyf.success(`Login successful`);
            onLoginSuccess();
        } catch (error: any) {
            if (error && error.response && error.response.data && error.response.data.message) {
                notyf.error(`Login failed: ${error.response.data.message}`);
            } else if (error && error.response && error.response.data) {
                notyf.error('Login failed: ' + JSON.stringify(error.response.data));
            } else if (error && error.request) {
                notyf.error("Login failed: No response from server");
            } else {
                notyf.error(`Login failed: ${error?.message || "Unknown error"}`);
            }
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <input
                type="text"
                placeholder="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LogIn;
