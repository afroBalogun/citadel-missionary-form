
import Footer from "./components/Footer";
import { Outlet } from "react-router";


export default function App(){

    return(
        <div className="flex flex-col min-h-screen">
            <Outlet/>
        </div>
    )
}