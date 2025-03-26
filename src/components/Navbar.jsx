import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication (modify this as per your auth logic)
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 bg-blue-600 text-white p-4 shadow-md m-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
                    Health Records
                </div>

                <div className="flex gap-4">
                    <NavLink to="/" className="hover:underline">Dashboard</NavLink>
                    <NavLink to="/records" className="hover:underline">Records</NavLink>
                    <NavLink to="/persons" className="hover:underline">Persons</NavLink>
                    <NavLink to="/add-record" className="hover:underline">Health Form</NavLink>
                </div>

                <div>
                    {localStorage.getItem("token") ? (
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
                            Logout
                        </button>
                    ) : (
                        <NavLink to="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
