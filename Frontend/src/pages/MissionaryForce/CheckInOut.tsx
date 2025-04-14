import { useEffect, useState } from "react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link } from "react-router";
import QRCode from "react-qr-code";


export default function CheckInOut() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup on unmount
      }, []);
    
      const formattedDate = currentTime.toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    
      const formattedTime = currentTime.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });

    return (
        <div className="flex justify-center items-center flex-grow ">
            <div className="hidden md:flex justify-center items-center">
                <QRCode value="https://citadel-missionary-form.vercel.app/check-in-out" className="mb-4 w-[100px] h-[100px] md:w-[200px] md:h-[200px]" />
            </div>
            <div className="flex flex-col items-center gap-2 md:gap-4 justify-center w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md md:shadow-none md:rounded-none">
                <h2 className="text-2xl md:text-3xl text-center w-98 md:w-[600px] font-inter font-extrabold text-gray-900">
                    CGCC Missionary Force Attendance
                </h2>
                <p className="text-sm md:text-lg uppercase font-medium text-center mb-4 w-98 md:w-[450px] font-inter text-gray-800"> 
                    {formattedDate}  {formattedTime}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <Link to="/attendance-form" className="bg-blue-500 flex items-center gap-2 text-white px-4 py-2 w-36 rounded-xl hover:bg-blue-600 transition-all duration-100"> 
                        <LuLogIn /> Check In
                    </Link>
                    <Link to="/" className="bg-blue-500 flex items-center gap-2 text-white px-4 py-2 w-36 rounded-xl hover:bg-blue-600 transition-all duration-100"> 
                        <LuLogOut /> Check Out
                    </Link>                
                </div>
            </div>
        </div>
    )
}