import { Link, useParams } from "react-router";
import { Navbar } from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


export function Order()
{

    const [dishItem, setDishItem] = useState(null);
    const [ userDet, setUserDet ] = useState(null);
    const [orderDet, setOrderDet] = useState(null);

    const [cookies] = useCookies(['user']);

    const { id } = useParams();

    useEffect(() => {

        const getDishItem = async () => {

            try{
                const res = await axios.get(`https://foodhub-backend-u5jo.onrender.com/menu/${id}/menu-items`);
                setDishItem(res.data);
            }
            catch(error){
                console.error(error);
            }

        };

        const getUserDetails = async () => {

            try{
                const userRes = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/user/details/${cookies.user}`
                );
                setUserDet(userRes.data);
            }
            catch(error){
                console.error(error);
            }

        };

        getDishItem();
        getUserDetails();

    },[id, cookies.user]);

    const handleConfirmPayment = async () => {
            
        if(!userDet?.id){
            alert("User data not loaded");
            return;
        }

        try{

            const paymentRes = await axios.post(
                "https://foodhub-backend-u5jo.onrender.com/order/create-payment",
                {
                    userId: userDet?.id,
                    restaurantId: dishItem.restaurant.id,
                    items: [{
                        menuItemId: dishItem._id,
                        itemName: dishItem.itemName,
                        price: dishItem.price,
                        quantity: 1
                    }]
                }
            );

            const data = paymentRes.data;

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "FoodHub",
                description: "Food Order Payment",
                order_id: data.razorpayOrderId,

                handler: async function(response) {
                    
                    const verifyRes = await axios.post(
                        "https://foodhub-backend-u5jo.onrender.com/order/verify-payment",
                        {
                            razorpayOrderId: response.razorpay_order_id,

                            razorpayPaymentId: response.razorpay_payment_id,

                            razorpaySignature: response.razorpay_signature,

                            order: {
                                userId: userDet.id,
                                restaurantId: dishItem.restaurant.id,
                                items: [
                                    {
                                        menuItemId: dishItem._id,
                                        itemName: dishItem.itemName,
                                        price: dishItem.price,
                                        quantity: 1
                                    }
                                ]
                            }
                        }
                    );

                    setOrderDet(verifyRes.data);

                    alert("Payment Successful");

                },

                prefill: {
                    name: userDet.name,
                    email: userDet.email
                },

                theme: {
                    color: "#3399cc"
                }

            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        }
        catch(error){
            console.error(error);
            alert("Payment Failed");
        }
        
    };

    return(
        <div className="order">
            <Navbar />

            <div className="order-main-cont">
                <Link to={'/'}>
                    <button className="back-btn">
                        <span className="bi bi-arrow-left"></span>
                        Back to Home
                    </button>
                </Link>

                <div className="order-det">
                    {dishItem && (
                        <div className="card dish-item" key={dishItem.id}>
                            <div className="card-images dish-image">
                                <img src={dishItem.image} alt={dishItem.itemName} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" fill="true" className="dish-img"></img>
                            </div>
                            <div className="card-header dish-header">
                                <div className="card-title dish-title"> {dishItem.itemName} </div>
                                <div className="dish-card-desc dish-desc"> {dishItem.description} </div>
                            </div>
                            <div className="card-body dish-order-body">
                                <div>
                                    <p className="dish-res"> Restaurant </p>
                                    <p className="dish-res-name"> {dishItem.restaurant?.name} </p>
                                </div>
                                <div>
                                    <p className="dish-res"> Category </p>
                                    <p className="dish-res-name"> {dishItem.category} </p>
                                </div>
                                <div>
                                    <p className="dish-res"> Price </p>
                                    <p className="dish-res-name">₹ {dishItem.price} </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="order-summary">
                        <div className="card order-summary-card">
                            <div className="card-header order-summary-card-header">
                                <div className="card-title order-summary-title">Order Summary</div>
                            </div>
                            <div className="card-body order-summary-card-body">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span> {dishItem?.itemName} </span>
                                        <span>₹ {dishItem?.price} </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Quantity</span>
                                        <span>1</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="total">₹ {dishItem?.price} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card order-summary-card">
                            <div className="card-header order-summary-card-header">
                                <div className="card-title order-summary-title">Delivery Address</div>
                            </div>
                            <div className="card-body user-card-body">
                                <p className="user-card-name"> {userDet?.name} </p>
                                <p className="user-card-add"> {userDet?.address} </p>
                            </div>
                        </div>

                        <button type="button" className="userLogin-btn" onClick={handleConfirmPayment}>
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}