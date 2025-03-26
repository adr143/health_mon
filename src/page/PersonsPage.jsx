import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PersonsPage = () => {
    const [persons, setPersons] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersons = async () => {
            const response = await fetch("https://health-records.netlify.app/api/get_persons");
            const data = await response.json();
            setPersons(data);
        };
        fetchPersons();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pb-8 px-4">
            <Navbar />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Persons List</h2>
                <ul className="space-y-4">
                    {persons.map((person) => (
                        <li
                            key={person.id}
                            onClick={() => navigate(`/person/${person.id}/records`)}
                            className="cursor-pointer bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200"
                        >
                            <p className="text-lg text-gray-700">
                                {person.last_name}, {person.first_name} {person.middle_name} - {person.age} years old
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
};

export default PersonsPage;
