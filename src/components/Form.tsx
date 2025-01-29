import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";

export default function Form() {
    const [isLocationValid, setIsLocationValid] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const targetLatitude = 6.59479609002876;
                const targetLongitude = 3.370229737879516;
                const distance = getDistanceFromLatLonInKm(latitude, longitude, targetLatitude, targetLongitude);
                if (distance < 0.1) { // Adjust the threshold as needed
                    setIsLocationValid(true);
                }
            });
        }
    }, []);

    function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

    const departments = [
        "Engineering",
        "Guest Relations",
        "Treasury",
        "Legal",
        "Technology group",
        "Multimedia",
        "Security",
        "ATS Trainers",
        "Protocol",
        "Prayer and Counselling",
        "Beautification",
        "Prison Ministries",
        "Drama",
        "Family Frendly Children Ministry",
        "New Dawn Choir",
        "Medical Missions",
        "Teens Teachers",
        "Hospitality",
        "Armor Bearers",
        "Family Life Center",
        "Publication",
        "M.E.R.I.T.T",
        "Economic Empowerment"
    ];

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    interface FormData {
        firstName: string;
        lastName: string;
        department: string;
        dateIn: string;
        gender: string;
    }

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <main className="form place-items-center mb-10">
            <div className="text-center h-[150px] flex flex-col justify-center items-center gap-2 transition-all duration-200
                md:items-start md:w-full md:px-[80px] md:bg-amber-100 md:h-[200px]
                max-[500px]:h-[100px] max-[500px]:gap-1 max-[500px]:mb-5

            ">
                <h3 className="text-[#DCA628] text-sm">
                    Missionary Force
                </h3>
                <h2 className="text-3xl text-[#656464] font-semibold md:text-4xl">
                    Attendance Forms  
                </h2>
            </div>
            
            {
                isLocationValid ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="w-3/5 flex flex-col px-5 gap-2 text-xs md:text-sm md:mt-10">
                        {/* First Name */}
                        <label htmlFor="firstName" className="font-semibold">First Name</label>
                        <input 
                            id="firstName" 
                            type="text" 
                            placeholder="John" 
                            className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && <span className="text-red-500">First name is required</span>}
                        
                        {/* Last Name */}
                        <label htmlFor="lastName" className="font-semibold">Last Name</label>
                        <input 
                            id="lastName" 
                            type="text" 
                            placeholder="Doe" 
                            className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && <span className="text-red-500">Last name is required</span>}
                        
                        {/* Department */}
                        <label htmlFor="department" className="font-semibold">Department</label>
                        <select 
                            id="department" 
                            title="Department" 
                            className="bg-gray-100 py-2 p-8 pl-4 rounded-2xl outline-0 hover:cursor-pointer transition-all duration-200 appearance-none"
                            {...register("department", { required: true })}
                        >
                            <option value="">Select Your Department</option>
                            {departments.map((department) => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
                        {errors.department && <span className="text-red-500">Department is required</span>}
                        
                        <div className="flex flex-col gap-4 md:flex-row">
                            {/* Date */}
                            <div className="date flex gap-2 flex-col md:w-2/5">
                                <label htmlFor="dateIn" className="font-semibold">Date In</label>
                                <input 
                                    id="dateIn" 
                                    type="date" 
                                    placeholder="DD/MM/YYYY" 
                                    className="bg-gray-100 px-4 py-2 rounded-2xl outline-0 transition-all duration-200 hover:cursor-pointer"
                                    {...register("dateIn", { required: true })}
                                />
                                {errors.dateIn && <span className="text-red-500">Date is required</span>}
                            </div>
                        
                            {/* Gender Selection */}
                            <div className="gender flex gap-2 flex-col">
                                <label htmlFor="" className="font-semibold">Gender</label>
                                <div className="flex gap-">
                        
                                    {/* Male */}
                                    <div className="flex gap-2 px-4 py-2">
                                        <input 
                                            type="radio" 
                                            id="male" 
                                            value="male" 
                                            className="hover:cursor-pointer transition-all duration-200"
                                            {...register("gender", { required: true })}
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                        
                                    {/* female */}
                                    <div className="flex gap-2 px-4 py-2">
                                        <input 
                                            type="radio" 
                                            id="female" 
                                            value="female" 
                                            className="hover:cursor-pointer transition-all duration-200"
                                            {...register("gender", { required: true })}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                                {errors.gender && <span className="text-red-500">Gender is required</span>}
                            </div>
                        </div>
                        
                        <button type="submit" className="bg-[#DCA628] p-3 text-white rounded-3xl mt-4 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-200">Submit</button>
                    </form>
                ) : (
                    <div className="h-[300px] flex items-center flex-col justify-center gap-2">
                        <FaLocationDot className="location-icon text-3xl"/>
                        <p className="">
                            You are not at the required location to fill out this form.
                        </p>
                    </div>
                )
            }
            
        </main>
    );
}