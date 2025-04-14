import { Link } from "react-router";

export default function Home(){
    // const images = [
    //     "/images/Jesus-is-Lord.png",
    //     "/images/CM3I6614.JPG",
    //   ];

    // const [currentImage, setCurrentImage] = useState(0);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setCurrentImage(prev => (prev + 1) % images.length);
    //   }, 4000); // change image every 4 seconds

    //   return () => clearInterval(interval); // cleanup on unmount
    // }, []);

    return(
        <div className="flex flex-col min-h-screen">
            <main className="w-screen flex flex-col md:flex-row h-screen font-sans">
                <section className="w-full h-full md:w-1/2 flex flex-col items-center justify-center bg-gray-900 ">
                    <img src={"images/Jesus-is-Lord2.png"} alt="" className="relative h-full w-full"/>
                    <div className="absolute top-0 left-0 w-full md:w-1/2  h-full bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 w-full md:w-1/2 gap-2 h-full flex flex-col items-center justify-center text-white">
                        <h1 className="text-[36px] md:text-[40px] lg:text-[48px] px-6 text-center font-extrabold font-inter">
                            Welcome to the <span className="text-blue-400">CGCC RECORDS</span>
                        </h1>
                        <div className="flex flex-col items-center justify-center gap-2 md:hidden">
                            <p className="text-lg font-semibold text-center mb-4 w-80 md:w-[400px] font-inter text-white"> 
                                Manage your attendance records for the Missionary Force and Vigil.
                            </p>
                            <Link to="/check-in-out" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-100">Missionary Force Attendance</Link>
                            <Link to="/missionary-vigil" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-100">Missionary Vigil</Link>
                        </div>
                    </div>
                </section>
                <section className="w-1/2 flex items-center justify-center bg-gray-100 max-md:hidden">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-lg font-semibold text-center mb-4 w-98 md:w-[380px] lg:w-[450px] font-inter text-gray-800"> 
                            Manage your attendance records for the Missionary Force and Vigil.
                        </p>
                        <Link to="/check-in-out" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-100">Missionary Force Attendance</Link>
                        <Link to="/missionary-vigil" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-100">Missionary Vigil</Link>
                    </div>
                </section>
            </main>

        </div>
    )
}