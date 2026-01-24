import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";


export function AdminDashboard()
{

    const [cookies] = useCookies(['admin']);

    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    if(!cookies.admin){
        navigate('/');
    }

    useEffect(() => {

        const getStats = async () => {
            try{
                const res = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/admin/stats`
                );

                setStats(res.data);
            }
            catch(err){
                console.error(err);
            }
        };

        const getOrders = async () => {
            try{
                const res1 = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/admin/orders`
                );

                setOrders(res1.data);
            }
            catch(error){
                console.error(error);
            }
        };

        getOrders();
        getStats();

    },[])

    return(
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold">Total Users</div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> {stats?.totalUsers} </p>
                        </div>
                    </div>
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold">Total Restaurants</div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> {stats?.totalRestaurants} </p>
                        </div>
                    </div>
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold">Total Orders</div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> {stats?.totalOrders} </p>
                        </div>
                    </div>
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold">Total Revenue</div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> ₹{stats?.totalRevenue} </p>
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

                    {orders.length === 0 ? (
                        <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                            <div className="card-body flex flex-col items-center justify-center py-12 px-6 space-y-4">
                                <p className="text-muted-foreground">No orders yet</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((ord) => (
                                <div key={ord.orderId} className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                                    <div className="card-body pt-6 px-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Order ID</p>
                                                <p className="font-mono text-sm">{ord.orderId}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Restaurant</p>
                                                <p className="font-medium">{ord.restaurantName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Item Name</p>
                                                <p className="text-sm">{ord.itemName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Amount</p>
                                                <p className="text-lg font-bold text-brand">₹{ord.itemPrice}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Status</p>
                                                <div className="userLogin-btn">
                                                    Delivered
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