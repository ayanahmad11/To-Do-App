import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError(''); // Reset error message
        const response = await fetch('https://to-do-app-theta-ebon.vercel.app/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
    
        const data = await response.json(); // Parse response body only once
        console.log(data);
    
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.pathname = '/'; 
        } else {
            setError("Invalid credentials");
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin}>Login</button>
                <div className="signup-link">
                    New here? <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

// import React, { useState } from 'react';
// import {Link} from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async () => {
//         const response = await fetch('https://to-do-app-theta-ebon.vercel.app/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });
    
//         const data = await response.json(); // Parse response body only once
//         console.log(data);
    
//         if (data.token) {
//             localStorage.setItem("token", data.token);
//             window.location.pathname = '/'; 
//         } else {
//             alert("Invalid credentials");
//         }
//     };
    

//     return (
//         <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
//             <div>
//                 <h2>Login</h2>
//                 <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
//                 <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
//                 New here? <Link to="/signup">Signup</Link>
//                 <button onClick={handleLogin}>Login</button>
//             </div>
//         </div>
//     );
// };

// export default Login;
