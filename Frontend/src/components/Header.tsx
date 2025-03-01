import { CiSearch } from "react-icons/ci";
import { FaMap } from "react-icons/fa6";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";

export default function Header(){
    return (
        <header className="flex justify-between items-center py-2 px-1 text-xs text-white bg-[#DCA628] transition-all duration-200
        md:px-20 
        max-[500px]:text-[.6em]
        2xl:px-40
   ">
       <div className="flex gap-4">
           <div className="flex items-center gap-1
               md:gap-2
           ">
               <FaMap />
               <p>30, Kudirat Abiola Way, Oregun, Lagos, Nigeria.</p>
           </div>
           <a href="mailto:contact@example.com"
                className="flex items-center gap-1
               md:gap-2
           ">
               <PiEnvelopeSimpleOpenThin />
               <p>info@thecitadelglobal.org</p>
           </a>
       </div>

       <div>
           <CiSearch className="hover:cursor-pointer text-sm max-[500px]:hidden"/>
       </div>
   </header>
    )
}