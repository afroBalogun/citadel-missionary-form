export default function Nav(){
    return (
        <nav className="flex justify-between items-center p-2 transition-all duration-200 
                md:px-20 2xl:px-40
            ">
                <a href="http://thecitadelglobal.org">
                    <img src="https://thecitadelglobal.org/ochikoos/2020/02/Full-CGCC-Logo.png" alt="The Citadel Global Community Church" className="w-[150px]" />
                </a>
                <a href="https://thecitadelglobal.org/contact" className="text-sm lg:px-4 font-semibold">Contact Us</a>
        </nav>
    )
}