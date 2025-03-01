
import { useState } from "react";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Nav from "./components/Nav";


export default function App(){
    const [isLocationValid, setIsLocationValid] = useState(true);

    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <Nav />
            <Form 
                isLocationValid = {isLocationValid}
                setIsLocationValid = {setIsLocationValid}
                additionalDepartments = {[]} 
            />
            <Footer 
                isLocationValid = {isLocationValid}
            />
        </div>
    )
}