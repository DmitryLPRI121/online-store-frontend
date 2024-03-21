import { Helmet } from "react-helmet-async";
import "./NotFoundPage.scss"

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Page Not Found | Online Store</title>
            </Helmet>
            <main className="NOT_FOUND_PAGE">
                <p>Not found</p>
            </main>
        </>
    )
}

export { NotFoundPage };