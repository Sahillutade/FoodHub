import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router";
import { Navbar } from "./navbar";


export function Restaurant()
{

    const [restaurant, setRestaurant] = useState(null);
    const [resItems, setResItems] = useState([]);

    const [cookies] = useCookies(['user']);

    const { name } = useParams();

    useEffect(() => {
        const getRes = async () => {
            try{
                const result = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/restaurant/details/${name}`
                );

                setRestaurant(result.data);
            }
            catch(err){
                console.error(err);
            }
        }

        getRes();
    },[name]);

    useEffect(() => {
        if(!restaurant?.id) return;

        const getResItems = async () => {
            try{
                const res = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/menu/restaurant/${restaurant?.id}`
                );

                setResItems(res.data);
            }
            catch(err){
                console.error(err);
            }
        };

        getResItems();
        
    },[restaurant?.id]);

    return(
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <Link to={'/'} style={{color: 'unset'}}>
                    <button type="button" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent/50 hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 mb-6 text-foreground ">
                        <div className="bi bi-arrow-left text-4 mr-2"></div>
                        Back to Home
                    </button>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-6">
                            <img src={restaurant?.image} alt={restaurant?.name} className="w-full h-full object-cover"></img>
                        </div>
                        <h1 className="text-4xl font-bold mb-2"> {restaurant?.name} </h1>
                        <p className="text-muted-foreground text-lg mb-4"> {restaurant?.email} </p>
                    </div>

                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-title leading-none font-semibold">Restaurant Info</div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <div className="flex items-start gap-2">
                                <div className="bi bi-geo-alt text-5 text-muted-foreground"></div>
                                <p className="text-sm"> {restaurant?.address} </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bi bi-telephone text-5 text-muted-foreground"></div>
                                <p className="text-sm"> {restaurant?.phone} </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="bi bi-clock text-5 text-muted-foreground"></div>
                                <div className="flex gap-2">
                                    <div className="text-sm"> {restaurant?.opens}AM </div>
                                    <p> - </p>
                                    <div className="text-sm"> {restaurant?.closes}PM </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Menu</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resItems.map((dish) => (
                            <div key={dish._id} className="card overflow-hidder hover:shadow-lg transition-shadow bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                                <div className="relative h-48 bg-muted overflow-hidden">
                                    <img src={dish.image} alt={dish.itemName} className="w-full h-full object-cover hover:scale-105 transition-transform"></img>
                                </div>
                                <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                                    <div className="card-title font-semibold text-lg"> {dish.itemName} </div>
                                    <div className="card-desc text-muted-foreground text-sm"> {dish.category} </div>
                                </div>
                                <div className="card-body px-6 space-y-4">
                                    <p className="text-sm text-muted-foreground"> {dish.description} </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-brand"> ₹{dish.price} </span>
                                        {cookies.user ? <Link to={`/order/${dish._id}`} style={{color: 'unset'}}>
                                            <button className="userLogin-btn">Order Now</button>
                                        </Link> : <Link style={{color: 'unset'}} to={'/login'}>
                                            <button className="userLogin-btn">Login to Order</button>
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}