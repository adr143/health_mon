import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PersonRecordsPage = () => {
    const { personId } = useParams();
    const [records, setRecords] = useState([]);
    const [person, setPerson] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://health-records.netlify.app/api/person/${personId}/records`)
            .then((res) => res.json())
            .then((data) => {
                setPerson(data.person);
                setRecords(data.records);
            })
            .catch((err) => console.error(err));
    }, [personId]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <Navbar />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
                {person ? (
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">First Name</h3>
                                <p className="text-gray-600">{person.first_name}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Middle Name</h3>
                                <p className="text-gray-600">{person.middle_name}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Last Name</h3>
                                <p className="text-gray-600">{person.last_name}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Birthday</h3>
                                <p className="text-gray-600">{person.birthday}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Age</h3>
                                <p className="text-gray-600">{person.age}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Sex</h3>
                                <p className="text-gray-600">{person.sex}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Civil Status</h3>
                                <p className="text-gray-600">{person.civil_status}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Religion</h3>
                                <p className="text-gray-600">{person.religion}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">College</h3>
                                <p className="text-gray-600">{person.college}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Course/Dept</h3>
                                <p className="text-gray-600">{person.course_or_department}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Student/Employee No</h3>
                                <p className="text-gray-600">{person.student_or_employee_no}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Address</h3>
                                <p className="text-gray-600">{person.address}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Contact</h3>
                                <p className="text-gray-600">{person.contact}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-gray-700">Emergency Contact</h3>
                                <p className="text-gray-600">{person.emergency_contact}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-xl text-gray-600">Loading...</p>
                    </div>
                )}
        
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Health Records</h3>
                    <ul className="space-y-4">
                        {records.map((record) => (
                            <li
                                key={record.id}
                                onClick={() => navigate(`${record.id}`)}
                                className="cursor-pointer bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200"
                            >
                                <p className="text-lg text-gray-700">Date: {record.recorded_at}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
    );
};

export default PersonRecordsPage;
