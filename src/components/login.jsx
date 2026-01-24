import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import { Navbar } from "./navbar";


export function Login()
{

    const [cookies, setCookie] = useCookies(["user", "resAdmin", "admin"]);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("https://foodhub-backend-u5jo.onrender.com/user/login", {
                email,
                password,
            });

            setCookie("user", res.data.name, { path: "/" });

            console.log("Logged in as : ", res.data.name);
            alert("Logged in as : ", res.data.name);

            setEmail("");
            setPassword("");
            navigate("/", { replace: true });

        }
        catch(err){
            alert(err.response?.data?.message);
            console.error(err);
        }
    }

    const handleRestaurantLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("https://foodhub-backend-u5jo.onrender.com/restaurant/login", {
                email,
                password,
            });

            setCookie("resAdmin", res.data.name, { path: "/" });

            console.log("Logged in as : ", res.data.name);
            alert("Logged in as : ", res.data.name);

            setEmail("");
            setPassword("");
            navigate('/restaurant/dashboard');

        }
        catch(err){
            alert(err.response?.data?.message);
            console.error(err);
        }
    }

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("https://foodhub-backend-u5jo.onrender.com/admin/login", {
                email,
                password,
            });

            setCookie("admin", res.data.name, { path: "/" });

            setEmail("");
            setPassword("");
            navigate('/admin/dashboard');

        }
        catch(err){
            alert(err.response?.data?.message);
            console.error(err);
        }
    }

    return (
        <div className="login">
            <div className="card login-card">
                <div className="card-header login-card-header">
                    <div className="card-title login-card-title">Login to FoodHub</div>
                    <div className="card-text login-card-text">
                        Choose your account type to continue
                    </div>
                </div>
                <div className="card-body login-card-body">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#user">
                                <span className="bi bi-person"></span>
                                User
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#restaurant">
                                <span className="bi bi-shop"></span>
                                Restaurant
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#admin">
                                <span className="bi bi-shield"></span>
                                Admin
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="user-form tab-pane show active" id="user">
                            <form onSubmit={handleUserLogin} className="user-login-form">
                                <div className="user-login-field1">
                                    <label htmlFor="userEmail" className="userEmail-label">Email</label>
                                    <input type="email" className="user-email" id="userEmail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@gmail.com" required></input>
                                </div>
                                <div className="user-login-field1">
                                    <label className="userEmail-label">Password</label>
                                    <input type="password" className="user-email" id="userPassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                                </div>
                                <button type="submit" className="userLogin-btn">Login as User</button>
                                <p className="user-para">
                                    Don&apos;t have an account?{" "}
                                    <Link to={'/register'} className="user-para-link">
                                        Register here 
                                    </Link>
                                </p>
                            </form>
                        </div>

                        <div className="user-form tab-pane" id="restaurant">
                            <form onSubmit={handleRestaurantLogin} className="user-login-form">
                                <div className="user-login-field1">
                                    <label htmlFor="resEmail" className="userEmail-label">Email</label>
                                    <input type="email" className="user-email" id="resEmail" name="email" placeholder="restaurant@gmail.com" onChange={(e) => setEmail(e.target.value)} required></input>
                                </div>
                                <div className="user-login-field1">
                                    <label className="userEmail-label">Password</label>
                                    <input type="password" className="user-email" id="resPassword" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                                </div>
                                <button type="submit" className="userLogin-btn">Login as Restaurant</button>
                                <p className="user-para">
                                    Don&apos;t have an account?{" "}
                                    <Link to={'/register'} className="user-para-link">
                                        Register here 
                                    </Link>
                                </p>
                            </form>
                        </div>

                        <div className="user-form tab-pane" id="admin">
                            <form onSubmit={handleAdminLogin} className="user-login-form">
                                <div className="user-login-field1">
                                    <label htmlFor="adminEmail" className="userEmail-label">Email</label>
                                    <input type="email" className="user-email" id="adminEmail" name="email" placeholder="admin@gmail.com" onChange={(e) => setEmail(e.target.value)} required></input>
                                </div>
                                <div className="user-login-field1">
                                    <label className="userEmail-label">Password</label>
                                    <input type="password" className="user-email" id="adminPassword" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                                </div>
                                <button type="submit" className="userLogin-btn">Login as Admin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}