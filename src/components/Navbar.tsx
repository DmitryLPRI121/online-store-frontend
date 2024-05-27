import { Link } from "react-router-dom";
import "./Navbar.scss"

const Navbar = () => {
    const isLoggedIn = localStorage.getItem('login') === 'true';
    return (
        <div className="NAVBAR">
            <Link to='/Home'>
                <div className="Logo">
                    <img src={require('../images/logo.png')} />
                    <label>Online Store</label>
                </div>
            </Link>
            <Link to='/Catalog'>
                <div className="Catalog">
                    <img src={require('../images/catalog.png')} />
                    <label>Каталог</label>
                </div>
            </Link>
            <div className="SearchBar">
                <input type="text" />
            </div>
            <Link to={isLoggedIn ? '/Account' : '/LoginPage'}>
                <div className="Account">
                    <img src={require('../images/AccountIcon.png')} />
                </div>
            </Link>
        </div>
    )
}

export { Navbar };