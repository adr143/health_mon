import { useState } from "react";
import Navbar from "../components/Navbar";

const HealthRecordForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        birthday: "",
        age: "",
        sex: "",
        civil_status: "",
        religion: "",
        college: "",
        course_or_department: "",
        student_or_employee_no: "",
        address: "",
        contact: "",
        emergency_contact: "",
        bmi:"",
        height: "",
        weight: "",
        blood_pressure: "",
        heart_rate: "",
        blood_oxygen: "",
        temperature: "",
    });

    const calculateAge = (birthdate) => {
        if (!birthdate) return "";
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            age: name === "birthday" ? calculateAge(value) : prevData.age,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const personResponse = await fetch("https://health-records.netlify.app/api/store_person", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    middle_name: formData.middle_name,
                    last_name: formData.last_name,
                    birthday: formData.birthday,
                    age: formData.age,
                    sex: formData.sex,
                    civil_status: formData.civil_status,
                    religion: formData.religion,
                    college: formData.college,
                    course_or_department: formData.course_or_department,
                    student_or_employee_no: formData.student_or_employee_no,
                    address: formData.address,
                    contact: formData.contact,
                    emergency_contact: formData.emergency_contact,
                }),
            });

            const personData = await personResponse.json();
            if (!personResponse.ok) throw new Error(personData.error);
            const person_id = personData.insertedData[0].id;
            console.log({
                person_id,
                height_cm: formData.height,
                weight_kg: formData.weight,
                blood_pressure: formData.blood_pressure,
                heart_rate: formData.heart_rate,
                blood_oxygen: formData.blood_oxygen,
                temperature: formData.temperature,
            })

            const recordResponse = await fetch("https://health-records.netlify.app/api/store_records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    person_id,
                    height_cm: formData.height,
                    weight_kg: formData.weight,
                    blood_pressure: formData.blood_pressure,
                    heart_rate: formData.heart_rate,
                    blood_oxygen: formData.blood_oxygen,
                    temperature: formData.temperature,
                }),
            });

            const recordData = await recordResponse.json();
            if (!recordResponse.ok) throw new Error(recordData.error);

            alert("Health record added successfully!");
            setFormData({
                first_name: "",
                middle_name: "",
                last_name: "",
                birthday: "",
                age: "",
                sex: "",
                civil_status: "",
                religion: "",
                college: "",
                course_or_department: "",
                student_or_employee_no: "",
                address: "",
                contact: "",
                emergency_contact: "",
                height: "",
                weight: "",
                blood_pressure: "",
                heart_rate: "",
                blood_oxygen: "",
                temperature: "",
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }


    };

    const handleAutoFillVitals = async () => {
        try {
            const response = await fetch("https://health-records.netlify.app/api/get_vitals");
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            
            setFormData((prevData) => ({
                ...prevData,
                heart_rate: data.heart_rate,
                blood_oxygen: data.blood_oxygen,
            }));
        } catch (error) {
            alert(`Error fetching vitals: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Health Record Form</h2>
                <form className="space-y-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { label: "First Name", name: "first_name" },
                            { label: "Middle Name", name: "middle_name" },
                            { label: "Last Name", name: "last_name" },
                            { label: "Birthday", name: "birthday", type: "date" },
                            { label: "Age", name: "age", type: "number", readOnly: true },
                            { label: "Sex", name: "sex", type: "select", options: ["Male", "Female"] },
                            { label: "Civil Status", name: "civil_status", type: "select", options: ["Single", "Married", "Widowed"] },
                            { label: "Religion", name: "religion" },
                            { label: "College", name: "college" },
                            { label: "Course/Department", name: "course_or_department" },
                            { label: "Student/Employee No.", name: "student_or_employee_no" },
                            { label: "Address", name: "address" },
                            { label: "Contact", name: "contact" },
                            { label: "Emergency Contact", name: "emergency_contact" }
                        ].map(({ label, name, type, options, readOnly }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                {type === "select" ? (
                                    <select
                                        className="input"
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select {label}</option>
                                        {options.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        className="input"
                                        type={type || "text"}
                                        name={name}
                                        placeholder={label}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        readOnly={readOnly}
                                        required
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-semibold border-b pb-2">Health Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { label: "Height (cm)", name: "height", type: "number" },
                            { label: "Weight (kg)", name: "weight", type: "number" },
                            { label: "Blood Pressure", name: "blood_pressure" },
                            { label: "Heart Rate (bpm)", name: "heart_rate", type: "number" },
                            { label: "Blood Oxygen (%)", name: "blood_oxygen", type: "number" },
                            { label: "Temperature (°C)", name: "temperature", type: "number" }
                        ].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    className="input"
                                    type={type || "text"}
                                    name={name}
                                    placeholder={label}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md" onClick={handleAutoFillVitals}>Auto-Fill Vitals</button>
                        <button type="submit" className="btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthRecordForm;
