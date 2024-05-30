import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./CategoryPage.scss"
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { IProduct } from "../ProductInterface";
import { Link, useParams } from "react-router-dom";
import ProductService from "../backend/service/ProductService";
import noImage from '../images/no-image.svg';

// const graphicsCardsData: IProduct[] = [
//     { id: 1, Title: 'NVIDIA GeForce RTX 3090', Rating: 4.9, Reviews: 180, Price: 140000 },
//     { id: 2, Title: 'AMD Radeon RX 6900 XT', Rating: 4.8, Reviews: 160, Price: 110000 },
//     { id: 3, Title: 'NVIDIA GeForce RTX 3080', Rating: 4.8, Reviews: 200, Price: 90000 },
//     { id: 4, Title: 'AMD Radeon RX 6800 XT', Rating: 4.7, Reviews: 150, Price: 80000 },
//     { id: 5, Title: 'NVIDIA GeForce RTX 3070', Rating: 4.7, Reviews: 160, Price: 60000 },
//     { id: 6, Title: 'AMD Radeon RX 6700 XT', Rating: 4.6, Reviews: 140, Price: 50000 },
//     { id: 7, Title: 'NVIDIA GeForce RTX 3060 Ti', Rating: 4.6, Reviews: 150, Price: 40000 },
//     { id: 8, Title: 'AMD Radeon RX 6600 XT', Rating: 4.5, Reviews: 130, Price: 35000 },
// ];


const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const categoryId = category ? parseInt(category, 10) : undefined;

    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    const [productTitleFilter, setProductTitleFilter] = useState('');

    const [subcategoryTitle, setSubcategoryTitle] = useState('All');

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300000);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        let productsData: IProduct[] = [];
        const fetchProducts = async () => {
            if (subcategoryTitle === 'All') {
                if (categoryId) {
                    productsData = await ProductService.getProductsByCategory(categoryId, page, pageSize, minPrice, maxPrice);
                } else {
                    productsData = await ProductService.getLatestProducts();
                }
            } else if (categoryId === 1) {
                if (subcategoryTitle === 'Gaming') {
                    productsData = await ProductService.getProductsBySubcategory(2, page, pageSize, minPrice, maxPrice);
                } else if (subcategoryTitle === 'Regular') {
                    productsData = await ProductService.getProductsBySubcategory(1, page, pageSize, minPrice, maxPrice);
                }
            } else if (categoryId === 2) {
                if (subcategoryTitle === 'Gaming') {
                    productsData = await ProductService.getProductsBySubcategory(4, page, pageSize, minPrice, maxPrice);
                } else if (subcategoryTitle === 'Regular') {
                    productsData = await ProductService.getProductsBySubcategory(3, page, pageSize, minPrice, maxPrice);
                }
            }
            setProducts(productsData);
        };

        fetchProducts();
    }, [subcategoryTitle, page, pageSize, minPrice, maxPrice]);

    useEffect(() => {
        if (productTitleFilter && productTitleFilter.length > 0) {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(productTitleFilter.toLowerCase())
            );
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(products);
        }
    }, [productTitleFilter, products]);

    const handleFilterReset = () => {
        setSubcategoryTitle('All');
        setMinPrice(0);
        setMaxPrice(300000);
        setProductTitleFilter('');
    };

    const productsToRender = productTitleFilter.length > 0 ? filteredProducts : products;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Категория | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="CATEGORY_PAGE">
                {/* Links navigation */}
                <h2>Видеокарты</h2>
                <div className="CategoryContent">
                    <div className="CategoryFilters">
                        <h3>Фильтры</h3>
                        <div>
                            <h4>Тип устройства</h4>
                            <div className="ProductType">
                                <button onClick={() => { setSubcategoryTitle('All'); setPage(1); }} style={subcategoryTitle === 'All' ? { border: 'solid 0.1em #2c4050' } : {}}>Все</button>
                                <button onClick={() => { setSubcategoryTitle('Gaming'); setPage(1); }} style={subcategoryTitle === 'Gaming' ? { border: 'solid 0.1em #2c4050' } : {}}>Обычный</button>
                                <button onClick={() => { setSubcategoryTitle('Regular'); setPage(1); }} style={subcategoryTitle === 'Regular' ? { border: 'solid 0.1em #2c4050' } : {}}>Игровой</button>
                            </div>
                        </div>
                        <div>
                            <h4>Цена</h4>
                            <div className="ProductPrice">
                                <input type="number" defaultValue={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value, 10))} placeholder="От" />
                                <input type="number" defaultValue={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))} placeholder="До" />
                            </div>
                        </div>
                        <button onClick={handleFilterReset}>Сбросить</button>
                    </div>
                    <div className="CategoryProducts">
                        <div className="CategoryView">
                            <div className="SearchBar">
                                <img src={require('../images/search.png')} />
                                <input type="text" value={productTitleFilter} onChange={(e) => setProductTitleFilter(e.target.value)} placeholder="Поиск" />
                            </div>
                            <div className="NumberProductsDisplay">
                                <button onClick={() => { setPageSize(10); setPage(1); }} style={pageSize === 10 ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', border: 'solid 0.1em #2c4050' } : {}}>10</button>
                                <button onClick={() => { setPageSize(25); setPage(1); }} style={pageSize === 25 ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', border: 'solid 0.1em #2c4050' } : {}}>25</button>
                                <button onClick={() => { setPageSize(50); setPage(1); }} style={pageSize === 50 ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', border: 'solid 0.1em #2c4050' } : {}}>50</button>
                            </div>
                        </div>
                        <div className="ProductList">
                            {productsToRender.map((product) => {
                                return (
                                    <Link to={`${product.id}`} key={product.id}>
                                        <div className="ProductCard">
                                            <div className="ProductImage">
                                                <img src={product?.imageUrl} onError={(e) => { e.currentTarget.src = noImage; }} />
                                            </div>
                                            <div className="ProductInfo">
                                                <div className="ProductTitle">
                                                    <h3>{product.title}</h3>
                                                    <h2>{product.subcategoryTitle}</h2>
                                                </div>
                                                <div className="ProductRating">
                                                    <p>{product?.rating}</p>
                                                    <img src={require('../images/ReviewStar.png')} />
                                                </div>
                                                <div className="ProductPrice">
                                                    <div className="ProductPriceValue">
                                                        <p>{product.price.toLocaleString('ru-RU')}</p>
                                                        <p>₽</p>
                                                    </div>
                                                    <button onClick={(e) => { e.preventDefault() }}>В корзину</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="Pagination">
                            <div className="PaginationButtons">
                                <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
                            </div>
                            <div className="PageNumber">
                                <span>{page}</span>
                            </div>
                            <div className="PaginationButtons">
                                <button onClick={() => setPage(page + 1)} disabled={products.length < pageSize}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export { CategoryPage };
