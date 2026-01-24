import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";


export function UserDashboard()
{

    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [orderList, setOrderlist] = useState([]);

    const navigate = useNavigate();

    const [cookies] = useCookies(['user']);

    if(!cookies.user){
        navigate('/');
    }

    useEffect(() => {
        const getUser = async () => {

            try{
                const res = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/user/details/${cookies.user}`
                );

                setUser(res.data);
            }
            catch(error){
                console.error(error);
            }

        };

        getUser();
    },[cookies.user]);

    useEffect(() => {
        if (!user?.id) return; // 🛑 STOP undefined calls

        const getStats = async () => {
            try {
                console.log("Calling stats API with userId:", user.id);

                const resStats = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/order/stats/${user.id}`
                );

                setStats(resStats.data);
            } catch (err) {
                console.error(err);
            }
        };

        getStats();
    }, [user]);

    useEffect(() => {
        if (!user?.id) return; // 🛑 STOP undefined calls

        const getLists = async () => {
            try {
                console.log("Calling stats API with userId:", user.id);

                const resList = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/order/user/${user.id}`
                );

                setOrderlist(resList.data);
            } catch (err) {
                console.error(err);
            }
        };

        getLists();
    }, [user]);

    return(
        <div className="order">
            <Navbar />

            <div className="order-main-cont">

                <Link to={'/'} className="mt-1">
                <button className="back-btn">
                    <span className="bi bi-arrow-left"></span>
                    Back to Home
                </button>
            </Link>

                <h1 className="user-dash-head">My Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card total-order-card">
                        <div className="card-header total-order-header">
                            <div className="card-desc total-order-desc">Total Orders</div>
                        </div>
                        <div className="card-body total-order-body">
                            <p className="card-text total-order-para">
                                {stats?.orderCount}
                            </p>
                        </div>
                    </div>
                    <div className="card total-order-card">
                        <div className="card-header total-order-header">
                            <div className="card-desc total-order-desc">Total Spent</div>
                        </div>
                        <div className="card-body total-order-body">
                            <p className="card-text total-order-para">
                              ₹  {stats?.totalAmount}
                            </p>
                        </div>
                    </div>
                    <div className="card total-order-card">
                        <div className="card-header total-order-header">
                            <div className="card-desc total-order-desc">Favorite Restaurants</div>
                        </div>
                        <div className="card-body total-order-body">
                            <p className="card-text total-order-para">Comming Soon</p>
                        </div>
                    </div>
                </div>

                <div className="card per-info">
                    <div className="card-header per-info-header">
                        <div className="card-title per-info-title">Profile Information</div>
                    </div>
                    <div className="card-body per-info-body">
                        <div>
                            <p className="per-info-para1">Name</p>
                            <p className="per-info-para2"> {user?.name} </p>
                        </div>
                        <div>
                            <p className="per-info-para1">Email</p>
                            <p className="per-info-para2"> {user?.email} </p>
                        </div>
                        <div>
                            <p className="per-info-para1">Phone Number</p>
                            <p className="per-info-para2"> {user?.phone} </p>
                        </div>
                        <div className="per-info-add">
                            <div className="bi bi-geo-alt geo-alt"></div>
                            <div>
                                <p className="per-info-add-name">Address</p>
                                <p className="per-info-para2">
                                    {user?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="user-orders">Order history</h2>
                    {orderList.length === 0 ? (
                        <div className="card noOrder">
                            <div className="card-body noOrder-body">
                                <div className="bi bi-bag" />
                                <p className="noOrder-p">No orders yet</p>
                                <Link to='/'>
                                    <button className="backHome">Start Ordering</button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="userOr">
                            {orderList.map((orders) => (
                                <div className=" card noOrder" key={orders.id}>
                                    <div className="card-body userOrders">
                                        <div className="userOrders-main">
                                            <div>
                                                <p className="userOrder-p1">Order ID</p>
                                                <p className="userOrders-p2"> {orders.id} </p>
                                            </div>
                                            <div>
                                                <p className="userOrder-p1">Dish Name</p>
                                                {orders.items.map((dish) => (
                                                    <p className="userOrders-p2"> {dish.itemName} </p>
                                                ))}
                                            </div>
                                            <div>
                                                <p className="userOrder-p1">Amount</p>
                                                <p className="userOrders-p2">₹ {orders.totalAmount} </p>
                                            </div>
                                            <div>
                                                <p className="userOrder-p1">Status</p>
                                                <div className="userLogin-btn">
                                                    Paid
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}