import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";


export function Register()
{

    const navigate = useNavigate();

    const [userOtp, setUserOtp] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phone: "",
        address: ""
    });
    const [resFormData, setResFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        image: "",
        opens: "",
        closes: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleResChange = (e) => {
        setResFormData({
            ...resFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOTP = async () => {
        if(!formData.email) alert("Enter your Email");

        try{
            const resOTP = await axios.post(
                `https://foodhub-backend-u5jo.onrender.com/user/send-otp`,
                {
                    email: formData.email,
                }
            );

            setUserOtp(resOTP.data);
        }
        catch(error){
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.otp !== userOtp?.otp){
            alert("Please Enter Correct OTP");
            return;
        }

        if(formData.password !== formData.confirmPassword){
            alert("Password does not match");
            return;
        }

        try{
            const response = await axios.post(
                `https://foodhub-backend-u5jo.onrender.com/user/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    password: formData.password,
                    gender: formData.gender
                }
            );

            alert("Registration successful");
            navigate('/login');
        }
        catch(error){
            alert("Registration failed");
            console.error(error);
        }
    }

    const handleResSubmit = async (e) => {
        e.preventDefault();

        if(resFormData.password !== resFormData.confirmPassword){
            alert("Password does not match");
            return;
        }

        try{
            const response = await axios.post(
                `https://foodhub-backend-u5jo.onrender.com/restaurant/register`,
                {
                    name: resFormData.name,
                    email: resFormData.email,
                    phone: resFormData.phone,
                    address: resFormData.address,
                    password: resFormData.password,
                    image: resFormData.image,
                    opens: resFormData.opens,
                    closes: resFormData.closes
                }
            );

            alert("Registration successful");
            navigate('/login');
        }
        catch(error){
            alert("Registration failed");
            console.error(error);
        }
    }

    return(
        <div className="register">
            <div className="card register-card">
                <div className="card-header register-card-header">
                    <div className="card-title register-card-title">Register on FoodHub</div>
                    <div className="card-text register-card-text">Create your account to get started</div>
                </div>
                <div className="card-body register-card-body">
                    <ul className="nav nav-tabs register-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="#user" data-bs-toggle="tab">
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
                    </ul>

                    <div className="tab-content">
                        <div className="user-form tab-pane show active" id="user">
                            <form className="user-login-form" onSubmit={handleSubmit}>
                                <div className="user-register-form-cont">
                                    <div className="user-login-field1">
                                        <label htmlFor="user-name" className="userEmail-label">Full Name</label>
                                        <input type="text" id="user-name" className="user-email" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <div>
                                            <label htmlFor="userEmail" className="userEmail-label">Email</label>
                                        </div>
                                        <div className="flex gap-1">
                                            <input type="email" className="user-email" id="userEmail" name="email" placeholder="user@example.com" required value={formData.email} onChange={handleChange}></input>
                                            <button onClick={handleOTP} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent/50 hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 mb-6 text-foreground">Get OTP</button>
                                        </div>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="user-otp" className="userEmail-label">Enter OTP</label>
                                        <input type="text" className="user-email" id="user-otp" name="otp" required value={formData.otp} onChange={handleChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="user-password" className="userEmail-label">Password</label>
                                        <input type="password" className="user-email" id="user-password" name="password" required value={formData.password} onChange={handleChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="user-confirm-password" className="userEmail-label">Confirm Password</label>
                                        <input type="password" className="user-email" id="user-confirm-password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="gender" className="userEmail-label">Gender</label>
                                        <select id="gender" name="gender" className="gender-select" required value={formData.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="number" className="userEmail-label">Contact Number</label>
                                        <input type="text" id="number" placeholder="+91 9876543210" name="phone" className="user-email" required value={formData.phone} onChange={handleChange}></input>
                                    </div>
                                    <div className="user-login-field2">
                                        <label htmlFor="user-address" className="userEmail-label">Address</label>
                                        <input type="text" className="user-email" id="user-address" name="address" required value={formData.address} onChange={handleChange}></input>
                                    </div>
                                </div>
                                <button type="submit" className="userLogin-btn">Register as User</button>
                                <p className="user-para">
                                    Already have an account?{" "}
                                    <Link to={'/login'} className="user-para-link">
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>

                        <div className="user-form tab-pane" id="restaurant">
                            <form className="user-login-form" onSubmit={handleResSubmit}>
                                <div className="user-register-form-cont">
                                    <div className="user-login-field2">
                                        <label htmlFor="restaurant-name" className="userEmail-label">Restaurant Name</label>
                                        <input type="text" className="user-email" placeholder="Bella Italia" id="restaurant-name" name="name" required value={resFormData.name} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label className="userEmail-label">Email</label>
                                        <input type="email" id="restaurant-email" placeholder="restaurant@example.com" name="email" className="user-email" required value={resFormData.email} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-number" className="userEmail-label">Contact number</label>
                                        <input type="text" id="restaurant-number" name="phone" placeholder="+1234567890" className="user-email" required value={resFormData.phone} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-password" className="userEmail-label">Password</label>
                                        <input type="password" id="restaurant-password" name="password" className="user-email" required value={resFormData.password} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-confirm-password" className="userEmail-label">Confirm Password</label>
                                        <input type="password" id="restaurant-confirm-password" name="confirmPassword" className="user-email" required value={resFormData.confirmPassword} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field2">
                                        <label htmlFor="restaurant-address" className="userEmail-label">Restaurant Address</label>
                                        <input type="text" className="user-email" id="restaurant-address" name="address" placeholder="123 Main St, Downtown" required value={resFormData.address} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-opening-time" className="userEmail-label">Opening Time</label>
                                        <input type="time" id="restaurant-opening-time" name="opens" className="user-email" required value={resFormData.opens} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-closing-time" className="userEmail-label">Closing Time</label>
                                        <input type="time" id="restaurant-closing-time" name="closes" className="user-email" required value={resFormData.closes} onChange={handleResChange}></input>
                                    </div>
                                    <div className="user-login-field1">
                                        <label htmlFor="restaurant-image" className="userEmail-label">Restaurant Image</label>
                                        <input type="text" id="restaurant-image" name="image" placeholder="Link or ./images/example.jpg" className="user-email" required value={resFormData.image} onChange={handleResChange}></input>
                                    </div>
                                </div>
                                <button type="submit" className="userLogin-btn">Register as Restaurant</button>
                                <p className="user-para">
                                    Already have an account?{" "}
                                    <Link to={'/login'} className="user-para-link">
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}