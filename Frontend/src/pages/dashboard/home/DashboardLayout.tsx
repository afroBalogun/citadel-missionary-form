import { Outlet } from "react-router";
import { MdDashboard } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";

export default function DashboardLayout(){
    const reactIcons = [MdDashboard, MdOutlineEventNote, FcDepartment]

    const navIcons = reactIcons.map((Icon, index) => {
        return (
            <li key={index}>
                <Icon className="text-white text-lg md:text-2xl hover:text-[#DCA628] hover:cursor-pointer transition-all duration-200 hover:scale-125"/>
            </li>
        )
    })

    return (
        <div className="w-full h-screen flex">
            <nav className="bg-[#24707C] h-full  p-6 flex place-items-center gap-4">
                <ul className="flex flex-col gap-5 items-center">
                    {navIcons}
                </ul>
            </nav>
            <section className="w-full bg-amber-100 flex flex-col ">
                <aside className="w-full h-10 place-items-center p-2">
                    hshs
                </aside>
                <Outlet/>
            </section>
            
        </div>
    )
}