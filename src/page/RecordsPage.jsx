import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const RecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersons = async () => {
            const response = await fetch("https://health-records.netlify.app/api/get_persons");
            const data = await response.json();
            setPeople(data);
        };
    
        fetchPersons();
    }, []);
    
    useEffect(() => {
        const fetchRecords = async () => {
            const response = await fetch(`https://health-records.netlify.app/api/get_records?filter=${filter}`);
            const data = await response.json();
            setRecords(data);
        };
    
        fetchRecords();
    }, [filter]);
    

    return (
        <div className="min-h-screen bg-gray-100 pb-8 px-4">
            <Navbar />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Health Records</h2>

                <input
                    type="text"
                    placeholder="Filter by name or date"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-6 p-3 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <ul className="space-y-4">
                    {records.map((record) => {
                        const person = people.find((p) => p.id === record.person_id);
                        return (
                            <li
                                key={record.id}
                                onClick={() => navigate(`/person/${record.person_id}/records/${record.id}`)}
                                style={{ cursor: "pointer" }}
                                className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200"
                            >
                                <div className="text-lg font-medium text-gray-800">
                                    {person ? `${person.first_name} ${person.last_name}` : "Unknown Person"}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    {record.recorded_at}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default RecordsPage;
