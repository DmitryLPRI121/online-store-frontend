import React, { useState, useRef, useEffect } from 'react';
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

const Tab = React.forwardRef<HTMLDivElement, TabProps>(({ data }, ref) => (
    <div ref={ref} className='TabContent'>
        {data.map((item) => (
            <Link to={`${item.id}`} key={item.id}>
                <div className='ProductCard'>
                    <img src='https://c.dns-shop.ru/thumb/st4/fit/500/500/0bab69bd071c5b93d6554558e81f9da6/d212b8b4d0f4fc5727cceb252eec43e085375d95ec5af2d541464a7af06f3bad.jpg.webp' alt={item.Title} />
                    <h3>{item.Title}</h3>
                    <div className='RatingReviews'>
                        <div>
                            <img src={require('../images/ReviewStar.png')} />
                            <p>{item.Rating}</p>
                        </div>
                        <p>{item.Reviews} {getReviewWord(item.Reviews)}</p>
                    </div>
                    <h2>{item.Price} ₽</h2>
                    <div className='ProductCardButtons'>
                        <button onClick={(e) => {e.preventDefault()}}>
                            <img src={require('../images/add-to-cart.png')} />
                        </button>
                        <button onClick={(e) => {e.preventDefault()}}>
                            <img src={require('../images/BookmarkOff.png')} />
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
    }, [activeTab]);

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const element = tabRefs[activeTab].current;
        const handleScroll = () => {
            if (element) {
                setIsAtStart(element.scrollLeft === 0);
                setIsAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth - 1);
            }
        };

        handleScroll();
    
        element?.addEventListener('scroll', handleScroll);
    
        return () => {
            element?.removeEventListener('scroll', handleScroll);
        };
    }, [activeTab, tabRefs]);
        
    return (
        <div className='ProductShowcaseComponent'>
            <div className='TabLabel'>
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => setActiveTab(index)} className={activeTab === index ? 'ActiveTab' : 'InactiveTab'}>
                        {tab.label}
                    </button>
                ))}
            </div>
            {!isAtStart && (
            <button className='leftBtn' onClick={() => {
                if (tabRefs[activeTab].current) {
                    tabRefs[activeTab].current!.scrollTo({
                        left: tabRefs[activeTab].current!.scrollLeft - 500,
                        behavior: 'smooth'
                    });
                }
            }}>&lt;</button>
            )}
            {tabs.map((tab, index) => (
                <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
                    <Tab ref={tabRefs[index]} data={tab.data} label={tab.label} />
                    <Link to={'/More'}>
                        <button>
                            Больше товаров данной категории
                        </button>
                    </Link>
                </div>
            ))}
            {!isAtEnd && (
                <button className='rightBtn' onClick={() => {
                    if (tabRefs[activeTab].current) {
                        tabRefs[activeTab].current!.scrollTo({
                            left: tabRefs[activeTab].current!.scrollLeft + 500,
                            behavior: 'smooth'
                        });
                    }
                }}>&gt;</button>
            )}
        </div>
    );
};

export default Tabs;
