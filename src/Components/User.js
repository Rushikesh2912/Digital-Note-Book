import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const User = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        // After successful login, update isLoggedIn to true
        setIsLoggedIn(true);
    };
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        setIsLoggedIn(false); // Update isLoggedIn state to false
        navigate('/login');
    };
    return (
        <div>
            <div className="dropdown mx-3">
            
            <i className="dropdown fa-solid fa-circle-user fa-2xl text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            </i>
            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton1">
            {/* Conditional rendering based on isLoggedIn state */}
            {isLoggedIn ? (
                <li>
                    <Link className="dropdown-item text-center" to='/login' onClick={handleLogout}>
                        <i className="fa-solid fa-sign-out-alt mx-3" style={{ color: "#057ee2" }}></i> Logout
                    </Link>
                </li>
            ) : (
                <>
                    <li>
                        <Link className="dropdown-item text-center" to="/login" onClick={handleLogin}>
                            <i className="fa-solid fa-right-to-bracket mx-3" style={{ color: "#057ee2" }}></i> Login
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-center" to="/signUp">
                            <i className="fa-solid fa-user-plus mx-2" style={{ color: "#057ee2" }}></i> SignUp
                        </Link>
                    </li>
                </>
            )}
        </ul>
        </div>

        </div>
    )
}

export default User
