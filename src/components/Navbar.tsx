import { Link } from "react-router-dom";
import "./Navbar.scss"
import { useEffect, useState } from "react";
import { IProduct } from "../ProductInterface";
import ProductService from "../backend/service/ProductService";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem('login') === 'true';

    const [searchQuery, setSearchQuery] = useState('');

    const [searchResult, setSearchResult] = useState<IProduct[]>([]);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    useEffect(() => {
        if (searchQuery) {
            ProductService.getProductsBySearch(searchQuery)
            .then(result => setSearchResult(result))
            .catch(error => console.error(error));
        }
    }, [searchQuery]);

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
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Поиск"
                />
                <div className="SearchResult" style={{ display: isFocused ? 'block' : 'none' }}>
                    {searchResult.slice(0, 15).map((product) => {
                        return (
                            <Link to={`/Catalog/${product.categoryId}/${product.id}`} key={product.id}>
                                <p>{product.title}</p>
                            </Link>
                        )
                    })}
                </div>
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