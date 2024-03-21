import { Helmet } from "react-helmet-async";
import "./HomePage.scss"

const HomePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Online Store</title>
            </Helmet>
            <main className="HOME_PAGE">
                <p>Home page</p>
            </main>
        </>
    )
}

export { HomePage };