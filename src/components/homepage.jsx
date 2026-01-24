import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router";
import axios from "axios";


export function Homepage()
{
    const navigate = useNavigate();

    const [cookies] = useCookies(['user'])
    const [searchQuery, setSearchQuery] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if(!searchQuery.trim()){
                const results = await axios.get(
                `https://foodhub-backend-u5jo.onrender.com/menu/list`
                );

                const resResults = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/restaurant/list`
                );

                setRestaurants(resResults.data);
                setMenuItems(results.data);
                return;
            }

            const response = await axios.get(
                `https://foodhub-backend-u5jo.onrender.com/api/search?q=${encodeURIComponent(searchQuery)}`
            );

            setDishes(response.data.dishes || []);
            setRestaurants(response.data.restaurants || []);
        };

        fetchSearchResults();
    },[searchQuery])

    return(
        <div className="home-page">
            <Navbar />

            <section className="homepage-section">
                <div className="home-sec-main-cont">
                    <div className="home-sec-cont">
                        <h1 className="home-head">
                            Delicious Food <span className="home-head-2">Delivered</span> to Your Door
                        </h1>
                        <p className="home-para">
                            Order from your favorite restaurants and enjoy fast, reliable delivery
                        </p>

                        <div className="search">
                            <div className="bi bi-search"></div>
                            <input type="text" placeholder="Search for restaurants or dishes..." className="search-field" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                        </div>

                        {!cookies.user && (
                            <div className="home-navi">
                                <Link to={'/login'}>
                                    <button className="login-btn">Login</button>
                                </Link>
                                <Link to={'/register'}>
                                    <button className="register-btn">Register</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {!searchQuery && (
                <section className="dish-section">
                    <div className="dish-sec-main-cont">
                        <div className="dish-sec-head">
                            <div className="bi bi-fork-knife" />
                            <h2 className="dish-sec-heading">All Dishes</h2>
                        </div>

                        <div className="dish-list-sec">
                            {menuItems.map((menus) => (
                                <div className="card dish-item" key={menus._id}>
                                    <div className="card-images dish-image">
                                        <img src={menus.image} alt={menus.itemName} fill="true" className="dish-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                                    </div>
                                    <div className="card-header dish-header">
                                        <div className="card-title dish-title"> {menus.itemName} </div>
                                        <div className="dish-card-desc dish-desc"> {menus.description} </div>
                                    </div>
                                    <div className="card-body dish-body">
                                        <p className="dish-res-name"> {menus.restaurant?.name || "Unknown Restaurant"} </p>
                                        <p className="dish-price">₹ {menus.price} </p>
                                    </div>
                                    <div className="card-footer dish-footer">
                                        { cookies.user ? <button className="order-btn" onClick={() => navigate(`/order/${menus._id}`)}>
                                            Order Now
                                        </button> : <button className="order-btn" onClick={() => navigate('/login')}>
                                            Login to Order
                                        </button> }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {searchQuery && dishes.length > 0 && (
                <section className="searchDish">
                    <div className="searchDish-cont">
                        <h2 className="searchDish-head">Dishes</h2>
                        <div className="searchDish-subCont">
                            {dishes.map(dish => (
                                <div className="card dish-item" key={dish.id}>
                                    <div className="card-images dish-image">
                                        <img src={dish.image} alt={dish.itemName} fill="true" className="dish-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"></img>
                                    </div>
                                    <div className="card-header dish-header">
                                        <div className="card-title dish-title"> {dish.itemName} </div>
                                        <div className="dish-card-desc dish-desc"> {dish.description} </div>
                                    </div>
                                    <div className="card-body dish-body">
                                        <p className="dish-res-name"> {dish.restaurant?.name} </p>
                                        <p className="dish-price">₹ {dish.price} </p>
                                    </div>
                                    <div className="card-footer dish-footer">
                                        { cookies.user ? <button className="order-btn" onClick={() => navigate(`/order/${dish.id}`)}>
                                            Order Now
                                        </button> : <button className="order-btn" onClick={() => navigate('/login')}>
                                            Login to Order
                                        </button> }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {searchQuery && restaurants.length > 0 && (
                <section className="searchDish">
                    <div className="searchDish-cont">
                        <h2 className="searchDish-head">Restaurants</h2>
                    </div>
                    <div className="resSearch-subCont">
                        {restaurants.map(item => (
                            <Link style={{textDecoration: 'unset'}} key={item.id} to={`/restaurant/${item.name}`}>
                                <div className="card dish-item">
                                    <div className="card-images dish-image">
                                        <img src={item.image} alt={item.name} fill="true" className="dish-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                                    </div>
                                    <div className="card-header dish-header">
                                        <div className="card-title dish-title"> {item.name} </div>
                                        <div className="dish-card-desc dish-desc"> {item.phone} </div>
                                    </div>
                                    <div className="card-body dish-body">
                                        <div className="res-address">
                                            <span className="bi bi-geo-alt"></span>
                                            <span> {item.address} </span>
                                        </div>
                                        <div className="res-address">
                                            <span className="bi bi-clock"></span>
                                            <span>
                                                {item.opens} am - {item.closes} pm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {!searchQuery && restaurants.length > 0 && (
                <section className="searchDish">
                    <div className="searchDish-cont">
                        <h2 className="searchDish-head">Restaurants</h2>
                    </div>
                    <div className="resSearch-subCont">
                        {restaurants.map(item => (
                            <Link key={item.id} style={{textDecoration: "unset"}} to={`/restaurant/${item.name}`}>
                                <div className="card dish-item">
                                    <div className="card-images dish-image">
                                        <img src={item.image} alt={item.name} fill="true" className="dish-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                                    </div>
                                    <div className="card-header dish-header">
                                        <div className="card-title dish-title"> {item.name} </div>
                                        <div className="dish-card-desc dish-desc"> {item.phone} </div>
                                    </div>
                                    <div className="card-body dish-body">
                                        <div className="res-address">
                                            <span className="bi bi-geo-alt"></span>
                                            <span> {item.address} </span>
                                        </div>
                                        <div className="res-address">
                                            <span className="bi bi-clock"></span>
                                            <span>
                                                {item.opens} am - {item.closes} pm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}