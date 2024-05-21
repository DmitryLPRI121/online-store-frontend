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
                        <Link to="">Новинки</Link>
                        <Link to="">Распродажи</Link>
                        <Link to="">Скидки</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Комплектующие для ПК</h2>
                        <Link to="">Процессоры</Link>
                        <Link to="">Видеокарты</Link>
                        <Link to="">Оперативная память</Link>
                        <Link to="">Материнские платы</Link>
                        <Link to="">Твердотельные накопители</Link>
                        <Link to="">Жесткие диски</Link>
                        <Link to="">Блоки питания</Link>
                        <Link to="">Кулеры</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Переносные гаджеты</h2>
                        <Link to="">Ноутбуки</Link>
                        <Link to="">Планшеты</Link>
                        <Link to="">Смарт-часы</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Периферийные устройства</h2>
                        <Link to="">Наушники</Link>
                        <Link to="">Микрофоны</Link>
                        <Link to="">Веб-камеры</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Акции</h2>
                        <Link to="">1</Link>
                        <Link to="">2</Link>
                        <Link to="">3</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Акции</h2>
                        <Link to="">1</Link>
                        <Link to="">2</Link>
                        <Link to="">3</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Акции</h2>
                        <Link to="">1</Link>
                        <Link to="">2</Link>
                        <Link to="">3</Link>
                    </div>
                    <div>
                        <img src={require('../images/discount.png')} alt="discounts" />
                        <h2>Акции</h2>
                        <Link to="">1</Link>
                        <Link to="">2</Link>
                        <Link to="">3</Link>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export { CatalogPage };