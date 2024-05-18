import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./DetailedPage.scss"
import { Footer } from "../components/Footer";
import { IProduct } from "../ProductInterface";
import noImage from '../images/no-image.svg';
import { useState } from "react";

const graphicsCardsData: IProduct = {
    id: 1,
    Title: 'NVIDIA GeForce RTX 3090',
    Description: 'Мощная графическая карта с архитектурой Ampere, обеспечивающая высокую производительность и потрясающее качество графики. Идеальный выбор для геймеров и профессионалов в области видео- и графического дизайна.',
    Rating: 4.9,
    Reviews: 180,
    Quantity: 45,
    Price: 140000,
    Attributes: {
        'VRAM': '24 GB GDDR6X',
        'Memory Bus Width': '384-bit',
        'CUDA Cores': '10496',
        'Boost Clock': '1.70 GHz',
        'Interface': 'PCI Express 4.0 x16',
    },
    CoverUmageUrl: 'https://c.dns-shop.ru/thumb/st4/fit/0/0/80ea4ded0631daa76a06f2aeee0da169/87f82d4fd671d5c34c856a8504f437c0f6eb795c2dc22ee52e5e5295162493bd.jpg.webp',
    GalleryImagesUrl: [
        'https://c.dns-shop.ru/thumb/st4/fit/wm/0/0/2329b247fd04a7eb1390ec7e897cf906/a9f23d0c540e635c9fb6dbf656ab8dbaf38a128d960e08d093493d17ac33a450.jpg.webp',
        'https://c.dns-shop.ru/thumb/st4/fit/wm/0/0/ef044acce9f59f3fbec7b990b05d3390/8809e94ab229208a5f468f3df8a97fc7977db15ce0a2e1323225057ca35e1fca.jpg.webp',
        'https://c.dns-shop.ru/thumb/st4/fit/wm/0/0/36502d3d9536b266bc30c42574c6583f/d73a6b6e402e2d9d52d7b91e3d275aee68c9b59281a6d60e2d452a742fc5cd2c.jpg.webp',
    ]
};

const DetailedPage = () => {

    const [currentImage, setCurrentImage] = useState(graphicsCardsData.CoverUmageUrl);
    const images = [graphicsCardsData.CoverUmageUrl, ...(graphicsCardsData.GalleryImagesUrl || [])];

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{graphicsCardsData.Title} | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="DETAILED_PAGE">
                {/* Links navigation */}
                <h2>{graphicsCardsData.Title}</h2>
                <div className="ProductCard">
                    <div className="ProductImageGallery">
                        <button>▲</button>
                        <div className="ProductImageGalleryTabs">
                            {images.map((imageUrl, index) => (
                                <button key={index} onMouseEnter={() => setCurrentImage(imageUrl)}>
                                    <img src={imageUrl ? imageUrl : noImage} alt={`product image ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                        <button>▼</button>
                    </div>
                    <div className="ProductImageView">
                        <img src={currentImage ? currentImage : noImage} alt="current product image" />
                    </div>
                    <div className="ProductInfo">
                        <div className="ProductDescription">
                            <p>{graphicsCardsData.Description}</p>
                        </div>
                        <div className="ProductActions">
                            <button>
                                <img src={require('../images/BookmarkOff.png')} />
                            </button>
                            <button>
                                <div>
                                    <p>{graphicsCardsData.Rating}</p>
                                    <img src={require('../images/ReviewStar.png')} />
                                </div>
                                <div>
                                    <p>({graphicsCardsData.Reviews})</p>
                                </div>
                            </button>
                            <button>
                                <img src={require('../images/share.png')} />
                            </button>
                        </div>
                        <div className="ProductPrice">
                            <div>
                                <p>Количество: {graphicsCardsData.Quantity} шт.</p>
                            </div>
                            <div>
                                <p>{graphicsCardsData.Price.toLocaleString('ru-RU')} ₽</p>
                                <button>Купить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Характеристики {graphicsCardsData.Title}</h2>
                <div className="ProductFeatures">
                    {graphicsCardsData.Attributes && Object.entries(graphicsCardsData.Attributes).map(([attribute, value]) => (
                        <>
                            <div key={attribute}>
                                <h3>{attribute}</h3>
                                <p>{value}</p>
                            </div>
                            <hr />
                        </>
                    ))}
                </div>
                <h2>Отзывы</h2>
                <div className="Reviews">
                    {/* Блок отзывов о товаре */}
                </div>
                <Footer />
            </main>
        </>
    )
}

export { DetailedPage };