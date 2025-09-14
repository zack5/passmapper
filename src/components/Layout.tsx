import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    const location = useLocation();

    return (
        <div className="site-wrapper">
            <Header />
            <div className="page-container">
                <main style={location.pathname === "/" ? { overflow: "hidden" } : {overflow: "visible"}}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}