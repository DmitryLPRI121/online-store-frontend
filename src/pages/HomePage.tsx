import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./HomePage.scss"
import Tabs from "../components/ProductShowcase";
import { Footer } from "../components/Footer";
import { IProduct } from "../ProductInterface";
import { useEffect, useState } from "react";
import ProductService from "../backend/service/ProductService";

// const processorsData: IProduct[] = [
//     { id: 1, title: 'Intel Core i9-10900K', rating: 4.8, price: 35000 },
//     { id: 2, title: 'AMD Ryzen 9 5900X', rating: 4.9, price: 38000 },
//     { id: 3, title: 'Intel Core i5-10600K', rating: 4.5, price: 20000 },
//     { id: 4, title: 'AMD Ryzen 7 5800X', rating: 4.7, price: 28000 },
//     { id: 5, title: 'Intel Core i3-10100', rating: 4.3, price: 10000 },
//     { id: 6, title: 'AMD Ryzen 5 5600X', rating: 4.6, price: 25000 },
// ];

// const graphicsCardsData: IProduct[] = [
//     { id: 1, title: 'NVIDIA GeForce RTX 3090', rating: 4.9, price: 140000 },
//     { id: 2, title: 'AMD Radeon RX 6900 XT', rating: 4.8, price: 110000 },
//     { id: 3, title: 'NVIDIA GeForce RTX 3080', rating: 4.8, price: 90000 },
//     { id: 4, title: 'AMD Radeon RX 6800 XT', rating: 4.7, price: 80000 },
//     { id: 5, title: 'NVIDIA GeForce RTX 3070', rating: 4.7, price: 60000 },
//     { id: 6, title: 'AMD Radeon RX 6700 XT', rating: 4.6, price: 50000 },
//     { id: 7, title: 'NVIDIA GeForce RTX 3060 Ti', rating: 4.6, price: 40000 },
//     { id: 8, title: 'AMD Radeon RX 6600 XT', rating: 4.5, price: 35000 },
// ];

// const ramData: IProduct[] = [
//     { id: 1, title: 'Corsair Vengeance RGB Pro 32GB (2 x 16GB)', rating: 4.8, price: 16000 },
//     { id: 2, title: 'G.Skill Trident Z RGB 16GB (2 x 8GB)', rating: 4.7, price: 12000 },
//     { id: 3, title: 'Crucial Ballistix 16GB (2 x 8GB)', rating: 4.6, price: 10000 },
//     { id: 4, title: 'HyperX Fury RGB 32GB (2 x 16GB)', rating: 4.8, price: 18000 },
//     { id: 5, title: 'Team T-FORCE DARK Z 32GB (2 x 16GB)', rating: 4.7, price: 17000 },
// ];

const HomePage = () => {

    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    const [laptopsProducts, setLaptopsProducts] = useState<IProduct[]>([]);
    const [desktopsProducts, setDesktopsProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const latestData = await ProductService.getLatestProducts();
            setLatestProducts(latestData);

            const desktopsData = await ProductService.getProductsByCategory(1);
            setDesktopsProducts(desktopsData);

            const laptopsData = await ProductService.getProductsByCategory(2);
            setLaptopsProducts(laptopsData);
        };
      
        fetchProducts();
    }, []);
      
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Главная | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="HOME_PAGE">
                <h2>Специальные предложения</h2>
                <div className="Stocks">   
                </div>
                <hr />
                <h2>Новинки</h2>
                <Tabs tabs={[
                    { data: latestProducts, label: 'Новинки', url: 'Latest' },
                ]}/>
                <hr />
                <h2>Настольные и переносные компьютеры</h2>
                <Tabs tabs={[
                    { data: desktopsProducts, label: 'Настольные компьютеры', url: '1' },
                    { data: laptopsProducts, label: 'Ноутбуки', url: '2' },
                ]}/>
                <hr />
                <Footer />
            </main>
        </>
    )
}

export { HomePage };