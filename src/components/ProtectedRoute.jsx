import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Check if user is logged in

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected content
};

export default ProtectedRoute;
