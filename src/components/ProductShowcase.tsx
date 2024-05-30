import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ProductShowcase.scss"
import { IProduct } from '../ProductInterface';
import noImage from '../images/no-image.svg';


interface TabProps {
    data: IProduct[];
    label: string;
    url: string;
}

interface TabsProps {
    tabs: TabProps[];
}


const Tab = React.forwardRef<HTMLDivElement, TabProps>(({ data, url }, ref) => (
    <div ref={ref} className='TabContent'>
        {data.map((item) => (
            <Link to={`/Catalog/${url}/${item.id}`} key={item.id}>
                <div className='ProductCard'>
                    <div className='cardImage'>
                        <ImageWithFallback src={item.imageUrl ?? noImage} alt={item.title} noImage={noImage} />
                    </div>
                    <h3>{item.title}</h3>
                    <div className='RatingReviews'>
                        <div>
                            <p>{item.rating}</p>
                            <img src={require('../images/ReviewStar.png')} alt="Review Star Icon" />
                        </div>
                    </div>
                    <h2>{item.price.toLocaleString('ru-RU')} ₽</h2>
                    <button onClick={(e) => {e.preventDefault()}}>
                        <img src={require('../images/add-to-cart.png')} alt="Add to card Icon" />
                    </button>
                </div>
            </Link>
        ))}
    </div>
));

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    noImage: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, noImage }) => {
    const [currentSrc, setCurrentSrc] = useState(noImage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        let timer: NodeJS.Timeout;

        const handleLoad = () => {
            clearTimeout(timer);
            setLoading(false);
            setCurrentSrc(src);
        };

        const handleError = () => {
            clearTimeout(timer);
            setLoading(false);
            setCurrentSrc(noImage);
        };

        timer = setTimeout(() => {
            if (loading) {
                handleError();
            }
        }, 2000);

        image.src = src;
        image.onload = handleLoad;
        image.onerror = handleError;

        return () => {
            clearTimeout(timer);
            image.onload = null;
            image.onerror = null;
        };
    }, [src, noImage, loading]);

    return <img src={currentSrc} alt={alt} />;
};


const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = tabs.map(() => React.createRef<HTMLDivElement>());

    useEffect(() => {
        if (tabRefs[activeTab].current) {
            tabRefs[activeTab].current!.scrollLeft = 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const element = tabRefs[activeTab].current;
        const handleScroll = () => {
            if (element) {
                setIsAtStart(element.scrollLeft === 0);
                setIsAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth - 10);
            }
        };

        handleScroll();
    
        element?.addEventListener('scroll', handleScroll);
    
        return () => {
            element?.removeEventListener('scroll', handleScroll);
        };
    }, [activeTab, tabRefs]);
        
    return (
        <div className="ProductShowcaseComponent">
            {tabs.length > 1 && (
                <div className='TabLabel'>
                    {tabs.map((tab, index) => (
                        <button key={index} onClick={() => setActiveTab(index)} className={activeTab === index ? 'ActiveTab' : 'InactiveTab'}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}
            {tabs.map((tab, index) => (
                <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                    <div className={`TapeField ${isAtStart ? 'at-start' : ''} ${isAtEnd ? 'at-end' : ''}`}>
                        {!isAtStart && (
                            <button className='leftBtn' onClick={() => {
                                if (tabRefs[activeTab].current) {
                                    tabRefs[activeTab].current!.scrollTo({
                                        left: tabRefs[activeTab].current!.scrollLeft - 550,
                                        behavior: 'smooth'
                                    });
                                }
                            }}>&lt;</button>
                        )}
                        <Tab ref={tabRefs[index]} data={tab.data} label={tab.label} url={tab.url} />
                        {!isAtEnd && (
                            <button className='rightBtn' onClick={() => {
                                if (tabRefs[activeTab].current) {
                                    tabRefs[activeTab].current!.scrollTo({
                                        left: tabRefs[activeTab].current!.scrollLeft + 550,
                                        behavior: 'smooth'
                                    });
                                }
                            }}>&gt;</button>
                        )}
                    </div>
                    <Link to={`/Catalog/${tab.url}`}>
                        <button>
                            Больше товаров данной категории
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Tabs;
