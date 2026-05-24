// src/pages/LoginSelector.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelector = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Startup Login */}
                <div
                    className="w-80 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer text-center"
                    onClick={() => navigate("/login")}
                >
                    <h2 className="text-xl font-semibold mb-4">Startup Login</h2>
                    <p className="text-gray-600 mb-4">Login as a startup user to manage your uploads and dashboard.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                        Go to Startup Login
                    </button>
                </div>

                {/* Investor Login */}
                <div
                    className="w-80 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer text-center"
                    onClick={() => navigate("/investor/login")}
                >
                    <h2 className="text-xl font-semibold mb-4">Investor Login</h2>
                    <p className="text-gray-600 mb-4">Login as an investor to view startup dashboards and details.</p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition">
                        Go to Investor Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginSelector;
