
import { Outlet } from "react-router";


export default function App(){

    return(
        <main className="flex flex-col min-h-screen">
            <Outlet/>
        </main>
    )
}