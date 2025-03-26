import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecordsPage from "./page/RecordsPage";
import PersonsPage from "./page/PersonsPage";
import Dashboard from "./page/Dashboard";
import PersonRecordsPage from "./page/PersonRecordsPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import HealthRecordForm from "./page/HealthRecordForm";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyEmail from "./page/VerifyEmail";
import RecordPage from "./page/RecordPage";

function App() {
    return (
      <>
        <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><RecordsPage /></ProtectedRoute>} />
            <Route path="/persons" element={<ProtectedRoute><PersonsPage /></ProtectedRoute>} />
            <Route path="/person/:personId/records" element={<ProtectedRoute><PersonRecordsPage /></ProtectedRoute>} />
            <Route path="/person/:personId/records/:recordId" element={<ProtectedRoute><RecordPage /></ProtectedRoute>} />
            <Route path="/add-record" element={<ProtectedRoute><HealthRecordForm /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyEmail />} />
        </Routes>
      </>
    );
}

export default App;
