import { Helmet } from "react-helmet-async";
import "./NotFoundPage.scss"
import { Navbar } from "../components/Navbar";

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Страница не найдена | Online Store</title>
            </Helmet>
            <Navbar />
            <main className="NOT_FOUND_PAGE">
                <p>Not found</p>
            </main>
        </>
    )
}

export { NotFoundPage };