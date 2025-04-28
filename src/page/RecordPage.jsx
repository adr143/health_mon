import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const RecordPage = () => {
    const { recordId } = useParams();
    const { personId } = useParams();
    const [record, setRecord] = useState({});
    const [person, setPerson] = useState(null);
    const [fitToEnroll, setFitToEnroll] = useState(true);

    useEffect(() => {
        fetch(`https://health-records.netlify.app/api/person/get_records`)
            .then((res) => res.json())
            .then((data) => {
                const dataMap = Object.fromEntries(data.map(item => [item.id, item]));
                const result = dataMap[recordId] || null;
                setRecord(result);
                const weight = record.weight_kg;
                const heightCm = record.height_cm;

                // Calculate BMI
                const heightM = heightCm / 100; // convert cm to meters
                const bmi = weight / (heightM * heightM);

                console.log('BMI:', bmi.toFixed(2)); // optional: for debugging

                // Check WHO standards
                if (bmi < 16 || bmi > 29.9) {
                    setFitToEnroll(false);
                } else {
                    setFitToEnroll(true);
                }
            })
            .catch((err) => console.error(err));

        fetch(`https://health-records.netlify.app/api/person/get_persons`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const dataMap = Object.fromEntries(data.map(item => [item.id, item]));
                const result = dataMap[personId] || null;
                setPerson(result);
            })
            .catch((err) => console.error(err));
        
    }, [recordId, personId]);



    return (
        <div className="min-h-screen bg-gray-100 pb-8 px-4">
            <Navbar />
            <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
                {
                    fitToEnroll ? (
                        <p className="absolute top-25 font-bold right-15 text-4xl text-green-600 rotate-45">FIT TO ENROLL</p>
                    ) : (
                        <p className="absolute top-25 font-bold right-15 text-4xl text-red-600 rotate-45">NOT FIT TO ENROLL</p>
                    )
                }
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Records for Person ID: {record.person_id}</h1>

                {person ? (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-lg text-gray-600"><strong>First Name:</strong> {person.first_name}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Middle Name:</strong> {person.middle_name}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Last Name:</strong> {person.last_name}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Birthday:</strong> {person.birthday}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Age:</strong> {person.age}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Sex:</strong> {person.sex}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Civil Status:</strong> {person.civil_status}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Religion:</strong> {person.religion}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>College:</strong> {person.college}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Course/Dept:</strong> {person.course_or_department}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Student/Employee No:</strong> {person.student_or_employee_no}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Address:</strong> {person.address}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Contact:</strong> {person.contact}</p>
                            </div>
                            <div>
                                <p className="text-lg text-gray-600"><strong>Emergency Contact:</strong> {person.emergency_contact}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-xl text-gray-600">Loading...</p>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Records</h2>
                    <ul className="space-y-4">
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Recorded At:</strong> {record.recorded_at}</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Height:</strong> {record.height_cm} cm</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Weight:</strong> {record.weight_kg} kg</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Blood Pressure:</strong> {record.blood_pressure}</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Heart Rate:</strong> {record.heart_rate} bpm</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Blood Oxygen:</strong> {record.blood_oxygen} %</p>
                        </li>
                        <li className="bg-gray-50 hover:bg-blue-100 px-6 py-4 rounded-lg shadow-sm transition duration-200">
                            <p className="text-lg text-gray-700"><strong>Temperature:</strong> {record.temperature} °C</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default RecordPage;
