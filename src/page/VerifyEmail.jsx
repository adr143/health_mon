import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setMessage("Invalid verification link.");
            return;
        }

        fetch("https://health-records.netlify.app/auth/verify", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
        
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessage(`Error: ${data.error}`);
            } else {
                setMessage("Email verified successfully! You can now log in.");
            }
        })
        .catch(() => setMessage("Something went wrong. Please try again later."));
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Email Verification</h2>

                <p className="text-lg text-gray-600">{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
