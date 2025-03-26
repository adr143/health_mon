import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHealthRecords = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve auth token
                const response = await fetch("https://health-records.netlify.app/api/get_records", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    processData(data, setRecords);
                } else {
                    setError(data.error || "Failed to fetch records");
                }
            } catch (err) {
                setError("An error occurred while fetching records.");
            } finally {
                setLoading(false);
            }
        };

        const fetchPeopleRecords = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve auth token
                const response = await fetch("https://health-records.netlify.app/api/get_persons", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    processData(data, setPeople);
                } else {
                    setError(data.error || "Failed to fetch records");
                }
            } catch (err) {
                setError("An error occurred while fetching records.");
            } finally {
                setLoading(false);
            }
        };

        fetchHealthRecords();
        fetchPeopleRecords();
    }, []);

    const processData = (data, setFunc) => {
        const groupedData = data.reduce((acc, record) => {
            const date = new Date(record.recorded_at).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.entries(groupedData).map(([date, count]) => ({
            date,
            count,
        }));

        setFunc(chartData);
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-6 px-4">
            <Navbar />
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
            
            {/* Health Records Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Health Records (Past Days)</h3>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={records}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* People Recorded Section */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">People Recorded (Past Days)</h3>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={people}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Dashboard;