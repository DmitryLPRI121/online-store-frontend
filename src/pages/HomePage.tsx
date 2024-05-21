import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./HomePage.scss"
import Tabs from "../components/ProductShowcase";
import { Footer } from "../components/Footer";
import { IProduct } from "../ProductInterface";

const processorsData: IProduct[] = [
    { id: 1, Title: 'Intel Core i9-10900K', Rating: 4.8, Reviews: 120, Price: 35000 },
    { id: 2, Title: 'AMD Ryzen 9 5900X', Rating: 4.9, Reviews: 150, Price: 38000 },
    { id: 3, Title: 'Intel Core i5-10600K', Rating: 4.5, Reviews: 80, Price: 20000 },
    { id: 4, Title: 'AMD Ryzen 7 5800X', Rating: 4.7, Reviews: 100, Price: 28000 },
    { id: 5, Title: 'Intel Core i3-10100', Rating: 4.3, Reviews: 60, Price: 10000 },
    { id: 6, Title: 'AMD Ryzen 5 5600X', Rating: 4.6, Reviews: 90, Price: 25000 },
];

const graphicsCardsData: IProduct[] = [
    { id: 1, Title: 'NVIDIA GeForce RTX 3090', Rating: 4.9, Reviews: 180, Price: 140000 },
    { id: 2, Title: 'AMD Radeon RX 6900 XT', Rating: 4.8, Reviews: 160, Price: 110000 },
    { id: 3, Title: 'NVIDIA GeForce RTX 3080', Rating: 4.8, Reviews: 200, Price: 90000 },
    { id: 4, Title: 'AMD Radeon RX 6800 XT', Rating: 4.7, Reviews: 150, Price: 80000 },
    { id: 5, Title: 'NVIDIA GeForce RTX 3070', Rating: 4.7, Reviews: 160, Price: 60000 },
    { id: 6, Title: 'AMD Radeon RX 6700 XT', Rating: 4.6, Reviews: 140, Price: 50000 },
    { id: 7, Title: 'NVIDIA GeForce RTX 3060 Ti', Rating: 4.6, Reviews: 150, Price: 40000 },
    { id: 8, Title: 'AMD Radeon RX 6600 XT', Rating: 4.5, Reviews: 130, Price: 35000 },
];

const ramData: IProduct[] = [
    { id: 1, Title: 'Corsair Vengeance RGB Pro 32GB (2 x 16GB)', Rating: 4.8, Reviews: 90, Price: 16000 },
    { id: 2, Title: 'G.Skill Trident Z RGB 16GB (2 x 8GB)', Rating: 4.7, Reviews: 80, Price: 12000 },
    { id: 3, Title: 'Crucial Ballistix 16GB (2 x 8GB)', Rating: 4.6, Reviews: 70, Price: 10000 },
    { id: 4, Title: 'HyperX Fury RGB 32GB (2 x 16GB)', Rating: 4.8, Reviews: 100, Price: 18000 },
    { id: 5, Title: 'Team T-FORCE DARK Z 32GB (2 x 16GB)', Rating: 4.7, Reviews: 90, Price: 17000 },
];

const laptopsData: IProduct[] = [
    { id: 1, Title: 'ASUS ROG Strix G15', Rating: 4.7, Reviews: 150, Price: 85000 },
    { id: 2, Title: 'Dell XPS 15', Rating: 4.8, Reviews: 180, Price: 120000 },
    { id: 3, Title: 'HP Spectre x360', Rating: 4.6, Reviews: 160, Price: 100000 },
    { id: 4, Title: 'Lenovo ThinkPad X1 Carbon', Rating: 4.9, Reviews: 200, Price: 130000 },
    { id: 5, Title: 'Apple MacBook Pro', Rating: 4.8, Reviews: 190, Price: 150000 },
];

const tabletsData: IProduct[] = [
    { id: 1, Title: 'Apple iPad Pro', Rating: 4.9, Reviews: 180, Price: 60000 },
    { id: 2, Title: 'Samsung Galaxy Tab S7', Rating: 4.8, Reviews: 160, Price: 55000 },
    { id: 3, Title: 'Microsoft Surface Pro 7', Rating: 4.7, Reviews: 150, Price: 70000 },
    { id: 4, Title: 'Lenovo Tab P11 Pro', Rating: 4.6, Reviews: 140, Price: 50000 },
    { id: 5, Title: 'Huawei MatePad Pro', Rating: 4.5, Reviews: 130, Price: 65000 },
    { id: 6, Title: 'Amazon Fire HD 10', Rating: 4.4, Reviews: 120, Price: 15000 },
    { id: 7, Title: 'Google Pixel Slate', Rating: 4.3, Reviews: 110, Price: 60000 },
];

const smartWatchesData: IProduct[] = [
    { id: 1, Title: 'Apple Watch Series 7', Rating: 4.8, Reviews: 200, Price: 25000 },
    { id: 2, Title: 'Samsung Galaxy Watch 4', Rating: 4.7, Reviews: 180, Price: 22000 },
    { id: 3, Title: 'Fitbit Versa 3', Rating: 4.6, Reviews: 170, Price: 15000 },
];


const motherboardsData: IProduct[] = [
    { id: 1, Title: 'ASUS ROG Strix X570-E Gaming', Rating: 4.8, Reviews: 200, Price: 20000 },
    { id: 2, Title: 'GIGABYTE Z590 AORUS MASTER', Rating: 4.7, Reviews: 180, Price: 23000 },
    { id: 3, Title: 'MSI MAG B550 TOMAHAWK', Rating: 4.6, Reviews: 160, Price: 15000 },
];

const ssdData: IProduct[] = [
    { id: 1, Title: 'Samsung 970 EVO Plus', Rating: 4.8, Reviews: 200, Price: 12000 },
    { id: 2, Title: 'WD Blue SN550', Rating: 4.7, Reviews: 180, Price: 8000 },
];

const hddData: IProduct[] = [
    { id: 1, Title: 'Seagate Barracuda', Rating: 4.6, Reviews: 200, Price: 4000 },
    { id: 2, Title: 'WD Black', Rating: 4.7, Reviews: 180, Price: 4500 },
];


const psuData: IProduct[] = [
    { id: 1, Title: 'EVGA SuperNOVA 750 G5', Rating: 4.8, Reviews: 200, Price: 7000 },
    { id: 2, Title: 'Corsair RM750x', Rating: 4.7, Reviews: 180, Price: 7500 },
    { id: 3, Title: 'Seasonic Focus GX-750', Rating: 4.6, Reviews: 160, Price: 8000 },
    { id: 4, Title: 'Thermaltake Toughpower GF1 750W', Rating: 4.5, Reviews: 140, Price: 6500 },
];

const coolersData: IProduct[] = [
    { id: 1, Title: 'Noctua NH-D15', Rating: 4.9, Reviews: 200, Price: 4500 },
    { id: 2, Title: 'be quiet! Dark Rock Pro 4', Rating: 4.8, Reviews: 180, Price: 4000 },
    { id: 3, Title: 'Cooler Master Hyper 212 RGB Black Edition', Rating: 4.7, Reviews: 160, Price: 2500 },
    { id: 4, Title: 'NZXT Kraken X63', Rating: 4.6, Reviews: 140, Price: 6000 },
];

const miceData: IProduct[] = [
    { id: 1, Title: 'Logitech G502 HERO', Rating: 4.8, Reviews: 200, Price: 2500 },
    { id: 2, Title: 'Razer DeathAdder V2', Rating: 4.7, Reviews: 180, Price: 3500 },
    { id: 3, Title: 'SteelSeries Rival 600', Rating: 4.6, Reviews: 160, Price: 4000 },
    { id: 4, Title: 'Corsair DARK CORE RGB PRO', Rating: 4.5, Reviews: 140, Price: 3000 },
    { id: 5, Title: 'Logitech G Pro Wireless', Rating: 4.4, Reviews: 120, Price: 5000 },
    { id: 6, Title: 'Roccat Kone AIMO', Rating: 4.6, Reviews: 150, Price: 2700 },
    { id: 7, Title: 'HyperX Pulsefire FPS Pro', Rating: 4.3, Reviews: 110, Price: 2200 },
    { id: 8, Title: 'ASUS ROG Gladius II', Rating: 4.7, Reviews: 170, Price: 3000 },
    { id: 9, Title: 'Zowie EC2', Rating: 4.5, Reviews: 130, Price: 2800 },
    { id: 10, Title: 'Microsoft Pro IntelliMouse', Rating: 4.9, Reviews: 220, Price: 2000 },
];

const keyboardsData: IProduct[] = [
    { id: 1, Title: 'Corsair K95 RGB Platinum XT', Rating: 4.8, Reviews: 200, Price: 13000 },
    { id: 2, Title: 'Logitech G Pro X', Rating: 4.7, Reviews: 180, Price: 11000 },
    { id: 3, Title: 'Razer BlackWidow V3', Rating: 4.6, Reviews: 160, Price: 8500 },
    { id: 4, Title: 'SteelSeries Apex Pro', Rating: 4.5, Reviews: 140, Price: 14000 },
    { id: 5, Title: 'HyperX Alloy FPS Pro', Rating: 4.4, Reviews: 120, Price: 4500 },
    { id: 6, Title: 'Ducky One 2 Mini', Rating: 4.6, Reviews: 150, Price: 9500 },
    { id: 7, Title: 'Cooler Master CK552', Rating: 4.3, Reviews: 110, Price: 6000 },
    { id: 8, Title: 'ASUS ROG Strix Scope RX', Rating: 4.7, Reviews: 170, Price: 11000 },
    { id: 9, Title: 'Logitech G513', Rating: 4.5, Reviews: 130, Price: 8500 },
    { id: 10, Title: 'DAS Keyboard 4 Professional', Rating: 4.9, Reviews: 220, Price: 12000 },
];

const headphonesData: IProduct[] = [
    { id: 1, Title: 'Bose QuietComfort 35 II', Rating: 4.8, Reviews: 200, Price: 20000 },
    { id: 2, Title: 'Sony WH-1000XM4', Rating: 4.7, Reviews: 180, Price: 23000 },
    { id: 3, Title: 'Sennheiser HD 660 S', Rating: 4.6, Reviews: 160, Price: 26000 },
    { id: 4, Title: 'Audio-Technica ATH-M50x', Rating: 4.5, Reviews: 140, Price: 9500 },
];

const microphonesData: IProduct[] = [
    { id: 1, Title: 'Blue Yeti USB Microphone', Rating: 4.8, Reviews: 200, Price: 5000 },
    { id: 2, Title: 'Rode NT-USB Mini', Rating: 4.7, Reviews: 180, Price: 3500 },
    { id: 3, Title: 'Audio-Technica AT2020', Rating: 4.6, Reviews: 160, Price: 4000 },
];

const webcamsData: IProduct[] = [
    { id: 1, Title: 'Logitech C920 HD Pro', Rating: 4.8, Reviews: 200, Price: 3500 },
    { id: 2, Title: 'Razer Kiyo', Rating: 4.7, Reviews: 180, Price: 5000 },
];

const HomePage = () => {
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
                <h2>Комплектующие для ПК</h2>
                <Tabs tabs={[
                    { data: processorsData, label: 'Процессоры', url: 'Processors' },
                    { data: graphicsCardsData, label: 'Видеокарты', url: 'GraphicsCards' },
                    { data: ramData, label: 'Оперативная память', url: 'RAM' },
                    { data: motherboardsData, label: 'Материнские платы', url: 'Motherboards' },
                    { data: ssdData, label: 'Твердотельные накопители', url: 'SSD' },
                    { data: hddData, label: 'Жесткие диски', url: 'HDD' },
                    { data: psuData, label: 'Блоки питания', url: 'PSU' },
                    { data: coolersData, label: 'Кулеры', url: 'Coolers' },                    
                ]}/>
                <hr />
                <h2>Переносные гаджеты</h2>
                <Tabs tabs={[
                    { data: laptopsData, label: 'Ноутбуки', url: 'Laptops' },
                    { data: tabletsData, label: 'Планшеты', url: 'Tablets' },
                    { data: smartWatchesData, label: 'Смарт-часы', url: 'SmartWatches' },
                ]}/>
                <hr />
                <h2>Периферийные устройства</h2>
                <Tabs tabs={[
                    { data: headphonesData, label: 'Наушники', url: 'Headphones' },
                    { data: microphonesData, label: 'Микрофоны', url: 'Microphones' },
                    { data: webcamsData, label: 'Веб-камеры', url: 'Webcams' },
                ]}/>
                <hr />
                <Footer />
            </main>
        </>
    )
}

export { HomePage };