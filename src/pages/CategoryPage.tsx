import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./CategoryPage.scss"
import { Footer } from "../components/Footer";
import { useState } from "react";
import { IProduct } from "../ProductInterface";

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
                            <h4>Наличие в магазинах</h4>
                        </div>
                        <div>
                            <h4>Производитель</h4>
                        </div>
                        <div>
                            <h4>Рейтинг</h4>
                        </div>
                        <div>
                            <h4>Цена</h4>
                        </div>
                        <div>
                            <h4>И .т.д.</h4>
                        </div>
                    </div>
                    <div className="CategoryProducts">
                        <div className="CategorySearch">
                            <input />
                        </div>
                        {/* <div className="ProductList">
                            {graphicsCardsData.map((product) => {
                                return (
                                    <div className="ProductCard">
                                        <h3>{product.Title}</h3>
                                        <div className="ProductRating">
                                            <span>{product.Rating}</span>
                                            <span>{product.Reviews}</span>
                                        </div>
                                    </div>
                            )})}
                        </div> */}
                        <div className="Pagination">

                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export { CategoryPage };