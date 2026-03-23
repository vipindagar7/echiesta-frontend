import React from "react";

const ScannerDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex">

            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-5 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">Scanner Panel</h2>

                <nav className="space-y-4">
                    <button className="w-full text-left px-3 py-2 bg-gray-700 rounded">
                        🎫 Scan Pass
                    </button>

                    <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded">
                        📊 Stats
                    </button>

                    <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded">
                        ⚙️ Settings
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>

                    <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-gray-800 p-4 rounded-xl">
                        <h3 className="text-gray-400">Total Entries</h3>
                        <p className="text-2xl font-bold">120</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-xl">
                        <h3 className="text-gray-400">Checked-in</h3>
                        <p className="text-2xl font-bold text-green-400">85</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-xl">
                        <h3 className="text-gray-400">Remaining</h3>
                        <p className="text-2xl font-bold text-yellow-400">35</p>
                    </div>

                </div>

                {/* Quick Action */}
                <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center justify-center">

                    <h2 className="text-xl font-semibold mb-4">
                        Ready to Scan?
                    </h2>

                    <button className="bg-green-600 px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
                        Start Scanning
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ScannerDashboard;