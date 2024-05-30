import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import "./DetailedPage.scss";
import { Footer } from "../components/Footer";
import noImage from '../images/no-image.svg';
import { useEffect, useState } from "react";
import ProductService from "../backend/service/ProductService";
import React from "react";
import { useParams } from "react-router-dom";
import { copyCurrentUrlToClipboard } from "../components/UrlClipboard";

const DetailedPage = () => {

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<any>(null);

    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const images = [product?.imageUrl, ...(product?.galleryImagesUrl || [])];

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = id ? parseInt(id, 10) : undefined;

            if (typeof productId === 'number') {
                const productData = await ProductService.getProductById(productId);
                setProduct(productData);
                console.log(productData);
            }
        };
      
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product && product.imageUrl) {
            setCurrentImage(product.imageUrl);
        }
    }, [product]);
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${product?.title}`} | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="DETAILED_PAGE">
                {/* Links navigation */}
                <h2>{product?.title}</h2>
                <div className="ProductCard">
                    <div className="ProductImageGallery">
                        <button>▲</button>
                        <div className="ProductImageGalleryTabs">
                            {images.map((imageUrl, index) => (
                                <button key={index} onMouseEnter={() => setCurrentImage(imageUrl)}>
                                    <img src={imageUrl ? imageUrl : noImage} alt={`product image ${index + 1}`} onError={(e) => e.currentTarget.src = noImage} />
                                </button>
                            ))}
                        </div>
                        <button>▼</button>
                    </div>
                    <div className="ProductImageView">
                        <img src={currentImage ? currentImage : noImage} alt="current product image" onError={(e) => e.currentTarget.src = noImage} />
                    </div>
                    <div className="ProductInfo">
                        <div className="ProductDescription">
                            <p>{product?.description}</p>
                        </div>
                        <div className="ProductActions">
                            <button>
                                <div>
                                    <p>{product?.rating}</p>
                                    <img src={require('../images/ReviewStar.png')} />
                                </div>
                            </button>
                            <button onClick={() => copyCurrentUrlToClipboard()}>
                                <img src={require('../images/share.png')} />
                            </button>
                        </div>
                        <div className="PurchaseActions">
                            <div className="ProductQuantity">
                                <p>Количество: {product?.quantity} шт.</p>
                            </div>
                            <div className="ProductPurchase">
                                <div className="ProductPrice">
                                    <p>{product?.price.toLocaleString('ru-RU')} ₽</p>
                                </div>
                                <div className="ProductAddToCart">
                                    <button>Добавить в корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Характеристики {product?.title}</h2>
                <div className="ProductFeatures">
                {product?.attributes && product.attributes.map((attr: any) => (
                    <React.Fragment key={attr.attribute.id}>
                        <div>
                        <h3>{attr.attribute.title}</h3>
                        <p>{attr.value}</p>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
                <h2>Отзывы</h2>
                <div className="Reviews">
                    {/* Блок отзывов о товаре */}
                </div>
                <Footer />
            </main>
        </>
    );
}

export { DetailedPage };
