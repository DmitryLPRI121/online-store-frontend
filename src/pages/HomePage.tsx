import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./HomePage.scss"
import { Link } from "react-router-dom";

interface IProducts {
    id: number;
    Title: string;
    Rating: number;
    Reviews: number;
    Price: number;
}

const products: IProducts[] = [
    {id: 1, Title: 'Laptop', Rating: 4.7, Reviews: 34, Price: 1000.0},
    {id: 2, Title: 'Смартфон', Rating: 4.5, Reviews: 120, Price: 800.0},
    {id: 3, Title: 'Планшет', Rating: 4.2, Reviews: 90, Price: 5000.0},
    {id: 4, Title: 'Умные часы', Rating: 4.0, Reviews: 50, Price: 300.0},
    {id: 5, Title: 'Камера', Rating: 4.8, Reviews: 80, Price: 700.0},
    {id: 6, Title: 'Наушники', Rating: 4.6, Reviews: 110, Price: 200.0},
    {id: 7, Title: 'Колонка', Rating: 4.3, Reviews: 70, Price: 100.0},
    {id: 8, Title: 'Монитор', Rating: 4.9, Reviews: 100, Price: 400.0},
    {id: 9, Title: 'Клавиатура', Rating: 4.4, Reviews: 60, Price: 150.0},
    {id: 10, Title: 'Мышь', Rating: 4.1, Reviews: 40, Price: 50.0}
    ];

const HomePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="HOME_PAGE">
                <h2>Специальные предложения</h2>
                <div className="Stocks">   
                </div>
                <hr />
                <h2>Новые товары</h2>
                <div className="NewProductsStripe">
                    {products.slice(0, Math.min(5, products.length)).map((product) => (
                        <Link to={`${product.id}`} key={product.id}>
                            <div className="NewProductCard">
                                <img src='https://c.dns-shop.ru/thumb/st4/fit/500/500/0bab69bd071c5b93d6554558e81f9da6/d212b8b4d0f4fc5727cceb252eec43e085375d95ec5af2d541464a7af06f3bad.jpg.webp' alt={product.Title} />
                                <h3>{product.Title}</h3>
                                <h4>{product.Price}</h4>
                                <button onClick={(e) => {e.preventDefault()}}>
                                    <img src={require('../images/add-to-cart.png')} />
                                </button>
                            </div>
                        </Link>
                    ))}
                    <Link to='/More'>
                        <div className="More">
                            <hr />
                            <p>Ещё</p>            
                        </div>
                    </Link>
                </div>
                <hr />
                <h2>Компьютерная техника</h2>
                <div className="NewProductsStripe">
                    {products.slice(0, Math.min(5, products.length)).map((product) => (
                        <Link to={`${product.id}`} key={product.id}>
                            <div className="NewProductCard">
                                <img src='https://c.dns-shop.ru/thumb/st4/fit/500/500/0bab69bd071c5b93d6554558e81f9da6/d212b8b4d0f4fc5727cceb252eec43e085375d95ec5af2d541464a7af06f3bad.jpg.webp' alt={product.Title} />
                                <h3>{product.Title}</h3>
                                <h4>{product.Price}</h4>
                                <button onClick={(e) => {e.preventDefault()}}>
                                    <img src={require('../images/add-to-cart.png')} />
                                </button>
                            </div>
                        </Link>
                    ))}
                    <Link to='/More'>
                        <div className="More">
                            <hr />
                            <p>Ещё</p>            
                        </div>
                    </Link>
                </div>
                <h2>Компьютерная техника</h2>
                <hr />
                <h2>Переносные гаджеты</h2>
                <hr />
                <h2>Периферийные устройства</h2>
                <hr />
                <h2>Компьютерные компоненты</h2>
            </main>
        </>
    )
}

export { HomePage };