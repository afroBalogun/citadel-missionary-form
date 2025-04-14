import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";
import { FaPlus, FaMinus  } from "react-icons/fa6";
import { Attendance, useAddAttendanceMutation } from "../redux/features/attendance/attendanceApi";
import Swal from "sweetalert2";
import getDistanceFromLatLonInKm from "../utils/getDistanceFromLocation";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";

interface FormProps {
    isLocationValid: boolean;
    setIsLocationValid: React.Dispatch<React.SetStateAction<boolean>>;
    additionalDepartments: string[];
}

const Form: React.FC<FormProps> = ({ isLocationValid, setIsLocationValid }) => {
    // Set to preferred radius around church
    const MAX_DISTANCE_KM = 0.5; 
    const [locationChecked, setLocationChecked] = useState(false);

    // Initialized state for selectedDepartments and showDepartments
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [showAdditionalDepartments, setShowAdditionalDepartments] = useState<boolean>(false)

    // Defined useForm modules to handle form data submission
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Attendance>();

    // Add Attendance to DB function
    const [addAttendance] = useAddAttendanceMutation();
    // const [message, setMessage] = useState<string | null>(null); 

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const targetLatitude = 6.594790761117772;
                const targetLongitude = 3.3702726519588877;
                const distance = getDistanceFromLatLonInKm(latitude, longitude, targetLatitude, targetLongitude);
                if (distance < MAX_DISTANCE_KM) {
                    setIsLocationValid(true);
                }
                setLocationChecked(true); 
            });
        } else {
            setLocationChecked(true); 
            }
    }, []);

    // All Departments
    const {data:departments} = useGetDepartmentsQuery()
    
    // Submit Form
    const onSubmit = async (data: Attendance) => {
        const formDataWithAdditional = {
            ...data,
            department: selectedDepartments, 
        };
        
        try {
            await addAttendance(formDataWithAdditional).unwrap();
            
            // Ensure the first letter of the first name is uppercase
            const formattedFirstName = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1);
    
            Swal.fire({
                title: `${formattedFirstName}, your attendance has been recorded!`,
                icon: "success",
                draggable: false,
            }).then(() => {
                // Refresh the page after user closes the success alert
                // window.location.reload();
                reset()
            });
        } catch (error: any) {
            console.error("Error submitting attendance:", error);
    
            // Check if the error is due to a duplicate entry (400 status)
            const errorMessage = error.data?.message || "There was an error registering your attendance. Please try again.";
    
            Swal.fire({
                title: "Oops! Something went wrong.",
                text: errorMessage, // Show the actual error message
                icon: "error",
                draggable: false
            });
        }
    };
    

    // Don't make the additional departments options visible if not needed
    const toggleVisibility = () => {
        setShowAdditionalDepartments(!showAdditionalDepartments);
    }

    // Alert if not in Church
    useEffect(() => {
        if (locationChecked && !isLocationValid) {
            Swal.fire({
                title: "Are you in Church?",
                text: "Try getting to church before filling the form.",
                icon: "question",
                confirmButtonColor: "#24707C",
                confirmButtonText: "Okay"
            });
        }
    }, [isLocationValid, locationChecked]); 


    return (
        <main className="form flex  flex-col justify-center items-center mb-10 flex-grow">
            <div className="text-center h-[150px] flex flex-col justify-center items-center gap-2 transition-all duration-200
                md:items-start md:w-full md:px-[80px] md:h-[200px] md:bg-[url(/images/praise.jpg)] md:bg-cover
                max-[500px]:h-[100px] max-[500px]:gap-1 max-[500px]:mb-5
            "
            >
                <h3 className="text-[#DCA628] text-sm">
                    Missionary Force
                </h3>
                <h2 className="text-3xl text-[#959595] font-semibold md:text-4xl md:text-white">
                    Attendance Forms  
                </h2>
            </div>
            
            {
                isLocationValid ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 flex flex-col px-5 gap-2 text-xs md:text-sm md:mt-10 md:w-3/5">
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
                        

                        {/* Departments Multi-Select */}
                        <div className="flex justify-between items-center mt-4 transition-all duration-200">
                            <label htmlFor="additionalDepartments" className="font-semibold">Department(s)</label>
                            <div className="hover:cursor-pointer flex items-center transition-all duration-200" onClick={() => toggleVisibility()}>
                                {
                                    showAdditionalDepartments ? <FaMinus className="transition-all duration-200"/> : <FaPlus className="transition-all duration-200"/>
                                }
                            </div>
                            
                        </div>
                        <div className={`${showAdditionalDepartments ? "" : ""}bg-gray-100 p-4 rounded-2xl hover:cursor-`}>
                        {Array.isArray(departments) && [...departments]
                          .sort()
                          .map((department) => (
                            <div key={department._id} className={`${showAdditionalDepartments ? "" : "hidden"} flex gap-2 items-center`}>
                              <input 
                                type="checkbox" 
                                id={department._id} 
                                value={department.departmentName}
                                checked={selectedDepartments.includes(department.departmentName)}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSelectedDepartments(prev =>
                                    prev.includes(value)
                                      ? prev.filter((dep) => dep !== value)
                                      : [...prev, value]
                                  );
                                }}
                              />
                              <label htmlFor={department} className="capitalize">{department.departmentName}</label>
                            </div>
                        ))}
                        </div>
                        
                        {/* Phone Numbers */}
                        <label htmlFor="phoneNumber" className="font-semibold">Phone Number</label>
                        <input
                            id="phoneNumber" 
                            type="text" 
                            placeholder="08012345678" 
                            className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200"
                            {...register("phoneNumber", { required: true })}
                        />
                        {errors.phoneNumber && <span className="text-red-500">Phone number is required</span>}

                        <div className="flex flex-col gap-4 md:flex-row">
                            {/* Date */}
                            <div className="date flex gap-2 flex-col md:w-2/5">
                                <label htmlFor="date" className="font-semibold">Date</label>
                                <input 
                                    id="date" 
                                    type="date" 
                                    value={new Date().toISOString().split('T')[0]} 
                                    readOnly
                                    className="bg-gray-100 px-4 py-2 rounded-2xl outline-0 transition-all duration-200"
                                    {...register("date", { required: true })}
                                />
                                {errors.date && <span className="text-red-500">Date is required</span>}
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
                    <div className="mt-20 flex items-center flex-col justify-center gap-2 flex-grow">
                        <FaLocationDot className="location-icon text-3xl"/>
                        <p className="text-sm w-[250px] text-center md:text-lg md:w-[300px] text-gray-700 font-semibold">
                            You are not at the required location to fill out this form.
                        </p>
                    </div>
                )
            }
            
        </main>
    );
}

export default Form;
