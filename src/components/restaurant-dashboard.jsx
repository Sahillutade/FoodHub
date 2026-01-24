import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router";


export function RestaurantDashboard()
{

    const [cookies] = useCookies(["resAdmin"]);

    const [reStats, setResStats] = useState(null);
    const [resDet, setResDet] = useState(null);
    const [menu, setMenu] = useState([]);
    const [resOrder, setResOrder] = useState([]);
    const [addItem, setAddItem] = useState({
        item_name: "",
        description: "",
        price: 0,
        category: "",
        meal_time: "",
        image: ""
    });
    const [editItem, setEditItem] = useState({
        item_name: "",
        description: "",
        price: 0,
        category: "",
        meal_time: "",
        image: ""
    });

    const [menuId, setMenuId] = useState(null);

    const handleChange = (e) => {
        setAddItem({
            ...addItem,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditChange = (e) => {

        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value,
        });

    };

    const navigate = useNavigate();

    if(!cookies.resAdmin){
        navigate('/');
    }

    const handleAddItem = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(
                `https://foodhub-backend-u5jo.onrender.com/menu/add-item`,
                {
                    itemName: addItem.item_name,
                    description: addItem.description,
                    price: addItem.price,
                    category: addItem.category,
                    image: addItem.image,
                    mealTime: addItem.meal_time,
                    restaurantId: resDet?.id
                }
            );

            alert(response.data);
        }
        catch(err){
            console.error(err);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try{
            const edit = await axios.put(
                `https://foodhub-backend-u5jo.onrender.com/menu/edit-item/${menuId}`,
                {
                    itemName: editItem.item_name,
                    description: editItem.description,
                    price: editItem.price,
                    category: editItem.category,
                    image: editItem.image,
                    mealTime: editItem.meal_time
                }
            );

            alert(edit.data);
        }
        catch(err){
            console.error(err);
        }
    };

    const handleDeleteItem = async (id) => {

        try{
            
            const del = await axios.delete(
                `https://foodhub-backend-u5jo.onrender.com/menu/delete/${id}`
            );

            alert(del.data);

        }
        catch(err){
            console.error(err);
        }

    };

    const handleEdit = async (id) => {

        try{

            const fetchItem = await axios.get(
                `https://foodhub-backend-u5jo.onrender.com/menu/${id}/menu-items`
            );

            setEditItem({
                item_name: fetchItem.data.itemName,
                description: fetchItem.data.description,
                price: fetchItem.data.price,
                category: fetchItem.data.category,
                meal_time: fetchItem.data.mealTime,
                image: fetchItem.data.image
            });

            setMenuId(fetchItem.data._id);

        }
        catch(err){
            console.error(err);
        }

    };

    useEffect(() => {
        const getStats = async () => {
            try{
                const res = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/restaurant/stats/${cookies.resAdmin}`
                );

                setResStats(res.data);
            }
            catch(err){
                console.error(err);
            }
        };

        const getDet = async () => {
            try{
                const result = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/restaurant/details/${cookies.resAdmin}`
                );

                setResDet(result.data);
            }
            catch(error){
                console.error(error);
            }
        };

        const getOrder = async () => {
            try{
                const result3 = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/order/restaurant/${cookies.resAdmin}`
                );

                setResOrder(result3.data);
            }
            catch(err){
                console.error(err);
            }
        };

        getOrder();
        getDet();
        getStats();
    },[cookies.resAdmin, addItem]);

    useEffect(() => {
        if (!resDet?.id) return;

        const getMenu = async () => {
            try {
                const result = await axios.get(
                    `https://foodhub-backend-u5jo.onrender.com/menu/restaurant/${resDet.id}`
                );
                setMenu(result.data);
            } catch (err) {
                console.error(err);
            }
        };

        getMenu();
    }, [resDet?.id, menu]);

    return(
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold"> Total Orders </div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> {reStats?.totalOrders} </p>
                        </div>
                    </div>
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold"> Total Revenue </div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> ₹{reStats?.totalRevenue} </p>
                        </div>
                    </div>
                    <div className="card bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                        <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                            <div className="card-desc leading-none font-semibold"> Menu Items </div>
                        </div>
                        <div className="card-body px-6 space-y-4">
                            <p className="text-4xl font-bold text-brand"> {reStats?.totalMenuItems} </p>
                        </div>
                    </div>
                </div>

                <div className="card mb-8 bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                    <div style={{background: "unset", border: "unset"}} className="card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]">
                        <div className="card-title  leading-none font-semibold">Restaurant Details</div>
                    </div>
                    <div className="card-body px-6 space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Restaurant Name</p>
                            <p className="font-medium text-lg">{resDet?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-medium text-lg">{resDet?.address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium text-lg">{resDet?.phone}</p>
                        </div>
                    </div>
                </div>

                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Menu Management</h2>
                        <div>
                            <button className="userLogin-btn" type="button" data-bs-toggle="modal" data-bs-target="#addMenuModal">
                                <div className="bi bi-plus"></div>
                                Add Menu Item
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {menu.map((item) => (
                            <div key={item._id} className="card mb-8 bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                                <div className="card-body px-6 pt-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div>
                                            <p className="font-semibold">{item.itemName}</p>
                                            <p className="text-sm text-muted-foreground">{item.category}</p>
                                        </div>
                                         <div>
                                            <p className="text-sm text-muted-foreground">Price</p>
                                            <p className="font-bold text-brand">₹{item.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Description</p>
                                            <p className="text-sm">{item.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(`${item._id}`)} className="userLogin=btn" data-bs-toggle="modal" data-bs-target="#editMenuModal">
                                                <div className="bi bi-pen text-4"></div>
                                            </button>
                                            <button onClick={() => handleDeleteItem(`${item._id}`)} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent/50 hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 mb-6 text-foreground">
                                                <div className="bi bi-trash text-4"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                    {resOrder.map((orders) => (
                        <div key={orders.id} className="card mb-8 bg-card text-card-foreground flex flex-column gap-6 rounded-xl border py-6 shadow-sm">
                            <div className="card-body px-6 pt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="font-mono text-sm">{orders.id}</p>
                                    </div>
                                    {orders.items.map(dish => (
                                        <div key={dish.menuItemId} className="flex gap-6">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Dishes</p>
                                                <p className="font-medium">{dish.itemName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Amount</p>
                                                <p className="text-lg font-bold text-brand">${dish.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <div className="userLogin-btn">
                                            Paid
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <div className="modal" id="addMenuModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header payment-header">
                            <h2 className="modal-title payment-title">Add New Menu Item</h2>
                            <p className="payment-desc">Add a new dish to your restaurant menu</p>
                            <button type="button" className="bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body space-y-4">
                            <form className="space-y-4" onSubmit={handleAddItem}>
                                <div>
                                    <label htmlFor="item_name" className="text-sm font-medium">Dish Name</label>
                                    <input type="text" name="item_name" id="item_name" value={addItem.item_name} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Dish Name"></input>
                                </div>
                                <div>
                                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                                    <input type="text" name="description" id="description" value={addItem.description} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Dish Description"></input>
                                </div>
                                <div>
                                    <label htmlFor="price" className="text-sm font-medium">Price</label>
                                    <input type="number" name="price" id="price" value={addItem.price} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Price"></input>
                                </div>
                                <div>
                                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                                    <input type="text" name="category" id="category" value={addItem.category} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Category"></input>
                                </div>
                                <div>
                                    <label htmlFor="meal_time" className="text-sm font-medium">Meal Time</label>
                                    <input type="text" name="meal_time" id="meal_time" value={addItem.meal_time} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Category"></input>
                                </div>
                                <div>
                                    <label htmlFor="image" className="text-sm font-medium">Image</label>
                                    <input type="text" name="image" id="image" value={addItem.image} onChange={handleChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Image Link"></input>
                                </div>
                                <button type="submit" className="w-full userLogin-btn">
                                    Add Item
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="editMenuModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header payment-header">
                            <h2 className="modal-title payment-title">Edit Menu Item</h2>
                            <p className="payment-desc">Edit the dish to your restaurant menu</p>
                            <button type="button" className="bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body space-y-4">
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="item_name" className="text-sm font-medium">Dish Name</label>
                                    <input type="text" name="item_name" id="item_name" value={editItem.item_name} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Dish Name"></input>
                                </div>
                                <div>
                                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                                    <input type="text" name="description" id="description" value={editItem.description} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Dish Description"></input>
                                </div>
                                <div>
                                    <label htmlFor="price" className="text-sm font-medium">Price</label>
                                    <input type="number" name="price" id="price" value={editItem.price} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Price"></input>
                                </div>
                                <div>
                                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                                    <input type="text" name="category" id="category" value={editItem.category} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Category"></input>
                                </div>
                                <div>
                                    <label htmlFor="meal_time" className="text-sm font-medium">Meal Time</label>
                                    <input type="text" name="meal_time" id="meal_time" value={editItem.meal_time} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Category"></input>
                                </div>
                                <div>
                                    <label htmlFor="image" className="text-sm font-medium">Image</label>
                                    <input type="text" name="image" id="image" value={editItem.image} onChange={handleEditChange} required className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-foreground placeholder:text-muted-foreground border-input" placeholder="Enter Image Link"></input>
                                </div>
                                <div className="flex gap-0.5">
                                    <button type="submit" className="w-full userLogin-btn">
                                        Edit Item
                                    </button>
                                    <button type="button" aria-label="close" data-bs-dismiss="modal" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent/50 hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 mb-6 text-foreground">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}