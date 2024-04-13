import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./HomePage.scss"
import Tabs from "../components/ProductShowcase";

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

const processorsData: IProducts[] = [
    { id: 1, Title: 'Intel Core i9-10900K', Rating: 4.8, Reviews: 120, Price: 500 },
    { id: 2, Title: 'AMD Ryzen 9 5900X', Rating: 4.9, Reviews: 150, Price: 550 },
    { id: 3, Title: 'Intel Core i5-10600K', Rating: 4.5, Reviews: 80, Price: 300 },
    { id: 4, Title: 'AMD Ryzen 7 5800X', Rating: 4.7, Reviews: 100, Price: 400 },
    { id: 5, Title: 'Intel Core i3-10100', Rating: 4.3, Reviews: 60, Price: 150 },
    // { id: 6, Title: 'AMD Ryzen 5 5600X', Rating: 4.6, Reviews: 90, Price: 300 },
    // { id: 7, Title: 'Intel Core i7-10700K', Rating: 4.7, Reviews: 110, Price: 450 },
    // { id: 8, Title: 'AMD Ryzen 3 3300X', Rating: 4.4, Reviews: 70, Price: 200 },
    // { id: 9, Title: 'Intel Core i9-11900K', Rating: 4.9, Reviews: 200, Price: 600 },
    // { id: 10, Title: 'AMD Ryzen 9 5950X', Rating: 5.0, Reviews: 250, Price: 700 },
];

const graphicsCardsData: IProducts[] = [
    { id: 1, Title: 'NVIDIA GeForce RTX 3090', Rating: 4.9, Reviews: 180, Price: 1500 },
    { id: 2, Title: 'AMD Radeon RX 6900 XT', Rating: 4.8, Reviews: 160, Price: 1200 },
    { id: 3, Title: 'NVIDIA GeForce RTX 3080', Rating: 4.8, Reviews: 200, Price: 1000 },
    { id: 4, Title: 'AMD Radeon RX 6800 XT', Rating: 4.7, Reviews: 150, Price: 900 },
    { id: 5, Title: 'NVIDIA GeForce RTX 3070', Rating: 4.7, Reviews: 160, Price: 700 },
    { id: 6, Title: 'AMD Radeon RX 6700 XT', Rating: 4.6, Reviews: 140, Price: 600 },
    { id: 7, Title: 'NVIDIA GeForce RTX 3060 Ti', Rating: 4.6, Reviews: 150, Price: 500 },
    { id: 8, Title: 'AMD Radeon RX 6600 XT', Rating: 4.5, Reviews: 130, Price: 400 },
    { id: 9, Title: 'NVIDIA GeForce RTX 2080 Ti', Rating: 4.7, Reviews: 170, Price: 1200 },
    { id: 10, Title: 'AMD Radeon RX 5700 XT', Rating: 4.4, Reviews: 120, Price: 350 },
];

const ramData: IProducts[] = [
    { id: 1, Title: 'Corsair Vengeance RGB Pro 32GB (2 x 16GB)', Rating: 4.8, Reviews: 90, Price: 200 },
    { id: 2, Title: 'G.Skill Trident Z RGB 16GB (2 x 8GB)', Rating: 4.7, Reviews: 80, Price: 150 },
    { id: 3, Title: 'Crucial Ballistix 16GB (2 x 8GB)', Rating: 4.6, Reviews: 70, Price: 120 },
    // { id: 4, Title: 'HyperX Fury RGB 32GB (2 x 16GB)', Rating: 4.8, Reviews: 100, Price: 220 },
    // { id: 5, Title: 'Team T-FORCE DARK Z 32GB (2 x 16GB)', Rating: 4.7, Reviews: 90, Price: 210 },
    // { id: 6, Title: 'ADATA XPG Spectrix D60G 16GB (2 x 8GB)', Rating: 4.5, Reviews: 60, Price: 130 },
    // { id: 7, Title: 'Patriot Viper Steel DDR4 16GB (2 x 8GB)', Rating: 4.6, Reviews: 80, Price: 140 },
    // { id: 8, Title: 'Crucial Ballistix MAX 32GB (2 x 16GB)', Rating: 4.9, Reviews: 110, Price: 250 },
    // { id: 9, Title: 'Kingston HyperX Predator RGB 16GB (2 x 8GB)', Rating: 4.7, Reviews: 100, Price: 170 },
    // { id: 10, Title: 'Corsair Vengeance LPX 64GB (2 x 32GB)', Rating: 4.9, Reviews: 120, Price: 300 },
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
                <h2>Компьютерные компоненты</h2>
                <Tabs tabs={[
                    { data: processorsData, label: 'Процессоры' },
                    { data: graphicsCardsData, label: 'Видеокарты' },
                    { data: ramData, label: 'Оперативная память' },
                ]}/>

                <hr />

                <h2>Компьютерная техника</h2>
                <hr />
                <h2>Переносные гаджеты</h2>
                <hr />
                <h2>Периферийные устройства</h2>
                <hr />
            </main>
        </>
    )
}

export { HomePage };