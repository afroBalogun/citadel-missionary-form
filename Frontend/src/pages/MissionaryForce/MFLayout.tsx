import { Outlet } from "react-router";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function MFLayout() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden" >
            <Header />
            <Nav />
            <Outlet/>
            <Footer/>
        </div>
    )
}