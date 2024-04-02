import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./HomePage.scss"
import { Link } from "react-router-dom";

interface IProducts {
    id: number;
    Title: string;
    Description: string;
    Price: number;
}

const products: IProducts[] = [
    {id: 1, Title: 'Laptop', Description: 'High performance laptop', Price: 1000.0},
    {id: 2, Title: 'Smartphone', Description: 'Latest model smartphone', Price: 800.0},
    {id: 3, Title: 'Tablet', Description: 'Portable tablet', Price: 500.0},
    {id: 4, Title: 'Smartwatch', Description: 'Smartwatch with various features', Price: 300.0},
    {id: 5, Title: 'Camera', Description: 'High resolution camera', Price: 700.0},
    {id: 6, Title: 'Headphones', Description: 'Noise cancelling headphones', Price: 200.0},
    {id: 7, Title: 'Speaker', Description: 'Bluetooth speaker', Price: 100.0},
    {id: 8, Title: 'Monitor', Description: 'HD monitor', Price: 400.0},
    {id: 9, Title: 'Keyboard', Description: 'Mechanical keyboard', Price: 150.0},
    {id: 10, Title: 'Mouse', Description: 'Wireless mouse', Price: 50.0}
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
                <h2>Новые товары</h2>
                <div className="NewProductsStripe">
                    {products.slice(0, Math.min(5, products.length)).map((product) => (
                        <div key={product.id} className="NewProductCard">
                            {/* <div className="CardImage"> */}
                                <img src='https://c.dns-shop.ru/thumb/st4/fit/500/500/0bab69bd071c5b93d6554558e81f9da6/d212b8b4d0f4fc5727cceb252eec43e085375d95ec5af2d541464a7af06f3bad.jpg.webp' alt={product.Title} />
                            {/* </div> */}
                            <h3>{product.Title}</h3>
                            <p>{product.Description}</p>
                            <h4>{product.Price}</h4>
                        </div>
                    ))}
                    <Link to='/More'>
                        <div className="More">
                            <hr />
                            <p>Ещё</p>            
                        </div>
                    </Link>
                </div>
            </main>
        </>
    )
}

export { HomePage };