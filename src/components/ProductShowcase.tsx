import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ProductShowcase.scss"

interface IProducts {
    id: number;
    Title: string;
    Rating: number;
    Reviews: number;
    Price: number;
}

interface TabProps {
    data: IProducts[];
    label: string;
    url: string;
}

interface TabsProps {
    tabs: TabProps[];
}

function getReviewWord(reviews: number) {
    let text;
    if (reviews === 1) {
        text = 'отзыв';
    } else if (reviews > 1 && reviews < 5) {
        text = 'отзыва';
    } else {
        text = 'отзывов';
    }
    return text;
}

const Tab = React.forwardRef<HTMLDivElement, TabProps>(({ data, url }, ref) => (
    <div ref={ref} className='TabContent'>
        {data.map((item) => (
            <Link to={`/Catalog/${url}/${item.id}`} key={item.id}>
                <div className='ProductCard'>
                    <img src='https://c.dns-shop.ru/thumb/st4/fit/500/500/0bab69bd071c5b93d6554558e81f9da6/d212b8b4d0f4fc5727cceb252eec43e085375d95ec5af2d541464a7af06f3bad.jpg.webp' alt={item.Title} />
                    <h3>{item.Title}</h3>
                    <div className='RatingReviews'>
                        <div>
                            <p>{item.Rating}</p>
                            <img src={require('../images/ReviewStar.png')} alt="Review Star Icon" />
                        </div>
                        <p>{item.Reviews} {getReviewWord(item.Reviews)}</p>
                    </div>
                    <h2>{item.Price.toLocaleString('ru-RU')} ₽</h2>
                    <div className='ProductCardButtons'>
                        <button onClick={(e) => {e.preventDefault()}}>
                            <img src={require('../images/add-to-cart.png')} alt="Add to card Icon" />
                        </button>
                        <button onClick={(e) => {e.preventDefault()}}>
                            <img src={require('../images/BookmarkOff.png')} alt="Bookmark Icon" />
                        </button>
                    </div>
                </div>
            </Link>
        ))}
    </div>
));

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
            <div className='TabLabel'>
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => setActiveTab(index)} className={activeTab === index ? 'ActiveTab' : 'InactiveTab'}>
                        {tab.label}
                    </button>
                ))}
            </div>
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
