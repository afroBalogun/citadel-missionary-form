import { Link, NavLink, Outlet, useLocation } from "react-router"; // make sure it's 'react-router-dom'
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { BiWindows } from "react-icons/bi";
import { RiCommunityLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function DashboardLayout() {
    const location = useLocation();
    const [showNav, setShowNav] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const reactIcons = [
        { icon: MdDashboard, title: "Overview", to: "/" },
        { icon: MdOutlineEventNote, title: "Records", to: "/manage-records" },
        { icon: RiCommunityLine, title: "Departments", to: "/manage-departments" },
    ];

    const handleNavToggle = () => {
        setShowNav(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node) && window.innerWidth < 768) {
                setShowNav(false);
            }
        };

        if (showNav) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNav]);


    const currentTitle =
        reactIcons.find((item) => `/admin/dashboard${item.to}` === location.pathname)?.title ??
        "Add Department";

    const navIcons = reactIcons.map((item, index) => {
        const Icon = item.icon;
        return (
            <li key={index} className='w-full'>
                <NavLink
                    to={`/admin/dashboard${item.to}`}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                        `flex gap-2 place-items-center w-full p-2 md:rounded-l-2xl transition-all duration-100 ${
                            isActive
                                ? "bg-white text-[#24467c]"
                                : "text-white hover:bg-[#DCA628]"
                        }`
                    }
                >
                    <Icon className='text-2xl' />
                    <p className='text-sm font-bold capitalize'>{item.title}</p>
                </NavLink>
            </li>
        );
    });

    return (
        <div className={`w-full h-screen ${showNav ? "" : ""} flex md:p-2 bg-[#24467c] transition-all duration-200`}>
            <nav ref={navRef}
                className={`bg-[#24467c] h-full  pr-0 flex place-items-center gap-4 max-md:absolute ${showNav ? "w-1/2 md:w-auto left-0 " : "-left-full opacity-0 absolute"} transition-all duration-200 z-20`}>
                <Link to={"/"} className="absolute top-2 px-2">
                    <img src="/images/cgcc-logo.png" alt="Logo" className=" h-10" />
                </Link>
                <ul className='w-full flex flex-col gap-5 items-center md:pl-2'>{navIcons}</ul>
            </nav>
            <section className='relative w-full flex flex-col p-2 md:rounded-2xl bg-white shadow-lg transition-all duration-100'>
                <aside className='w-full h-10 flex items-start gap-2 border-b-[1px] border-grey-300 pb-2'>
                    <BiWindows className='p-2 text-4xl hover:cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-200' 
                        onClick={handleNavToggle}
                    />
                    <h1 className='text-lg  text-[#24467c] capitalize px-3 border-l-[1px] border-grey-300 pb-2'>
                        {currentTitle}
                    </h1>
                </aside>
                <Outlet />
            </section>
        </div>
    );
}
