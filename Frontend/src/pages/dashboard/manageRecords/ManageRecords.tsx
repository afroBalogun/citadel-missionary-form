import { useState } from "react";
import {
    useGetAttendanceQuery,
    useGetAttendanceByParameterQuery,
} from "@/redux/features/attendance/attendanceApi";
import { CiSearch } from "react-icons/ci";
import {
    Department,
    useGetDepartmentsQuery,
} from "@/redux/features/department/departmentApi";
import { PiDotsSixVerticalBold } from "react-icons/pi";

export default function ManageRecords() {
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");

    const hasFilters = department || date || name;

    const { data: allData, isLoading: loadingAll } = useGetAttendanceQuery();
    const { data: departments } = useGetDepartmentsQuery();

    const { data: filteredData, isLoading: loadingFiltered } =
        useGetAttendanceByParameterQuery(
            { department, date, gender: undefined, name },
            { skip: !hasFilters }
        );

    const records = hasFilters ? filteredData?.data ?? [] : allData?.data ?? [];
    const filteredRecords = records.map((record, index) => {
        return(
            <tr key={record.id || index} className="w-full bg-white text-grey-800 text-center text-md md:text-sm border-b"> 
                <td className= "py-2"><PiDotsSixVerticalBold /></td>
                <td className= "py-2 capitalize">{record.firstName} {record.lastName}</td>
                <td className= "py-2 capitalize">{record.department.join(", ")}</td>
                <td className= "py-2 capitalize">{record.gender}</td>
                <td className= "py-2">{record.phoneNumber}</td>
                <td className= "py-2">{new Date(record.date).toLocaleDateString()}</td>
            </tr>
        )
    })
    const availableDepartments =
        Array.isArray(departments) &&
        [...departments]
            .sort((a, b) => a.departmentName.localeCompare(b.departmentName))
            .map((department: Department, index) => {
                return (
                    <option key={index} value={department.departmentName}>
                        {department.departmentName}
                    </option>
                );
            });

    return (
        <div className='w-full px-3 py-2 overflow-y-auto flex flex-col gap-4 h-full'>
            <div className='my-4'>
                <div className='flex flex-col gap-2 border-b-[1px] border-grey-300 pb-2'>
                    <h1 className='text-2xl font-bold text-[#24467c] capitalize'>
                        Manage Records
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Manage attendance records
                    </p>
                </div>
            </div>

            <div className='flex flex-wrap gap-3 items-center'>
                <div className='flex items-center bg-gray-100 border-2 border-gray-200 rounded-4xl pl-2 gap-2 w-full max-w-[500px] hover:border-[#24467c] transition-all duration-200'>
                    <CiSearch className='text-2xl text-gray-600' />
                    <input
                        type='text'
                        placeholder='Search with name(Firstname first)'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='flex-grow text-sm outline-none bg-transparent p-3'
                    />
                </div>

                <label htmlFor='department-select' className='sr-only'>
                    Select Department
                </label>
                <select
                    id='department-select'
                    title='Departments'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className='p-3 px-4 bg-gray-100 border-2 border-gray-200 text-gray-600 rounded-4xl w-[200px] text-sm hover:border-[#24467c] transition-all duration-200'
                >
                    <option value=''>Select Department</option>
                    {availableDepartments}
                </select>

                <input
                    type='date'
                    title='Select a date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='p-3 px-4 bg-gray-100 text-gray-600 rounded-4xl w-[150px] text-sm border-2 border-gray-200 hover:border-[#24467c] transition-all duration-200'
                />
            </div>

            <div className='mt-6'>
                {loadingFiltered || loadingAll ? (
                    <div className="w-full text-gray-400 flex flex-col justify-center items-center gap-2">
                        loading......
                    </div>            
                ) : records.length === 0 ? (
                    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                        <img src="/images/hyung.png" alt="" className="w-98 lg:w-[500px]"/>
                    </div>
                ) : (
                    <div className="overflow-x-auto ">
                        <table className="w-[800px] lg:w-full bg-white shadow-md rounded-xl overflow-x-auto">
                            <thead className="w-full rounded-xl">
                                <tr className="w-full bg-gray-100 text-grey-800 text-md md:text-sm text-center">
                                    <th className="py-2 font-light">&nbsp;</th>
                                    <th className="py-2 font-light">Fullname</th>
                                    <th className="py-2 font-light">Department(s)</th>
                                    <th className="py-2 font-light">Gender</th>
                                    <th className="py-2 font-light">Phone Number</th>
                                    <th className="py-2 font-light">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
