import { useCookies } from "react-cookie"
import { Link } from "react-router";


export function Navbar()
{

    const [cookies, , removeCookie] = useCookies(["user","resAdmin","admin"]);

    const isAuthenticated = !!cookies.user || !!cookies.resAdmin || !!cookies.admin;

    function getDashboardLink() {
        if (cookies.user) {
            return "/user/dashboard";
        }

        if (cookies.resAdmin) {
            return "/restaurant/dashboard";
        }

        if (cookies.admin) {
            return "/admin/dashboard";
        }

        return "/";
    }

    const getRoleIcon = () => {
        if(cookies.user) return <span className="bi bi-person" />
        if(cookies.resAdmin) return <span className="bi bi-shop-window" />
        if(cookies.admin) return <span className="bi bi-shield" />

        return <span className="bi bi-person"></span>
    };

    const getUserDet = () => {
        if(cookies.user) return <span className="dropdown-item"> {cookies.user} </span>
        if (cookies.resAdmin) return <span className="dropdown-item"> {cookies.resAdmin} </span>
        if(cookies.admin) return <span className="dropdown-item"> {cookies.admin} </span> 
    };

    const handleLogout = () => {
        if(cookies.user) removeCookie('user');
        if(cookies.resAdmin) removeCookie('resAdmin');
        if(cookies.admin) removeCookie('admin');
    }

    return(
        <nav className="navbar">
            <div className="navbar-cont">
                <div className="company-head">
                    FoodHub
                </div>

                <div className="navigations">
                    {isAuthenticated ? (
                        <>
                            <Link className="nav-link" to={getDashboardLink()}>
                                <button className="dashboard-btn db-ghost">Dashboard</button>
                            </Link>
                            <div className="dropstart">
                                <button className="dropdown-trigger" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {getRoleIcon()}
                                </button>
                                <ul className="dropdown-menu">
                                    <li> {getUserDet()} </li>
                                    <li> <span className="dropdown-item" role="button" onClick={handleLogout}>Logout</span> </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link className="login-click" to={'/login'}>
                            <button className="login-btn">Login</button>
                        </Link>
                    ) }
                </div>
            </div>
        </nav>
    )
}