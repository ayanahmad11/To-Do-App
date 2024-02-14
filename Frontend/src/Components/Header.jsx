import React from 'react';
import './Header.css'; // Import CSS file for styling

const Header = () => {
    return (
        <div className="header">
            <span className="logo">To Do App</span>
            <span className="emoji" role="img" aria-label="todo">✅</span>
        </div>
    );
};

export default Header;