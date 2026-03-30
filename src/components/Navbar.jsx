import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../AuthenticationPage/Authentication';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
            <div className="text-2xl font-bold">Task Dashboard</div>
            <div className="space-x-4 flex items-center">
                {isAuthenticated() ? (
                    <>
                        <span className="text-sm">Welcome, {user?.email}</span>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/register" className="hover:text-gray-300">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;