import { Helmet } from "react-helmet-async";
import "./NotFoundPage.scss"
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import image404 from '../images/404.svg';

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Страница не найдена | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="NOT_FOUND_PAGE">
                <div className="NotFoundPageInfo">
                    <img src={image404} alt="404" />
                    <h1>Страница не найдена</h1>
                    <p>Хотите вернуться на главную страницу?</p>
                    <Link to="/Home">
                        <button>Вернуться</button>
                    </Link>
                </div>
            </main>
        </>
    )
}

export { NotFoundPage };