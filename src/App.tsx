
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Nav from "./components/Nav";


export default function App(){
    return(
        <div className="min-h-screen">
            <Header />
            <Nav />
            <Form />
            <Footer />
        </div>
    )
}