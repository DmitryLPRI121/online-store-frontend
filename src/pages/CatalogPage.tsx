import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./CatalogPage.scss"
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

const CatalogPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Каталог | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="CATALOG_PAGE">
                <div className="CatalogItems">
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Акции</h2>
                        <Link to="/Catalog/Latest">Новинки</Link>
                    </div>
                    <div>
                        <img src={require('../images/desktop_laptop.jpg')} alt="discounts" />
                        <h2>Настольные компьютеры и ноутбуки</h2>
                        <Link to="/Catalog/Desktops">Настольные компьютеры</Link>
                        <Link to="/Catalog/Laptops">Ноутбуки</Link>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export { CatalogPage };