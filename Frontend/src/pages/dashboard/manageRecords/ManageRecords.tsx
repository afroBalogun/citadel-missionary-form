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
import ExcelJS from "exceljs";


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
        return (
            <tr
                key={record.id || index}
                className='w-full bg-white text-grey-800 text-center text-md md:text-sm border-b'
            >
                <td className='py-2'>
                    <PiDotsSixVerticalBold />
                </td>
                <td className='py-2 capitalize'>
                    {record.firstName} {record.lastName}
                </td>
                <td className='py-2 capitalize'>
                    {record.department.join(", ")}
                </td>
                <td className='py-2 capitalize'>{record.gender}</td>
                <td className='py-2'>{record.phoneNumber}</td>
                <td className='py-2'>
                    {new Date(record.date).toLocaleDateString()}
                </td>
                <td
                    className={`py-2 ${
                        (() => {
                            const time = new Date(record.createdAt);
                            const hour = time.getHours();
                            const minute = time.getMinutes();
                            return hour > 8 || (hour === 8 && minute > 0)
                                ? "text-red-500"
                                : "";
                        })()
                    }`}
                >
                    {new Date(record.createdAt).toLocaleTimeString("en-NG", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </td>

            </tr>
        );
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
    const resetFilters = () => {
        setName("");
        setDepartment("");
        setDate("");
    };
            
    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Attendance Records");
    
        // Header row with bold styling
        worksheet.columns = [
            { header: "Fullname", key: "fullname", width: 25 },
            { header: "Department(s)", key: "departments", width: 25 },
            { header: "Gender", key: "gender", width: 15 },
            { header: "Phone Number", key: "phone", width: 20 },
            { header: "Date", key: "date", width: 15 },
            { header: "Time", key: "time", width: 15 },
        ];
    
        worksheet.getRow(1).font = { bold: true };
    
        // Add rows with capitalized data
        records.forEach((record) => {
            const time = new Date(record.createdAt);
            const hour = time.getHours();
            const minute = time.getMinutes();
            const isLate = hour > 8 || (hour === 8 && minute > 0);
    
            const row = worksheet.addRow({
                fullname: `${record.firstName} ${record.lastName}`.toUpperCase(),
                departments: record.department.join(", ").toUpperCase(),
                gender: record.gender.toUpperCase(),
                phone: record.phoneNumber,
                date: new Date(record.date).toLocaleDateString(),
                time: time.toLocaleTimeString("en-NG", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                }),
            });
    
            // Apply red font to time cell if late
            if (isLate) {
                const timeCell = row.getCell("time");
                timeCell.font = { color: { argb: "FFFF0000" } }; // Red
            }
        });
    
        // Save file
        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "attendance-records.xlsx";
            anchor.click();
            URL.revokeObjectURL(url);
        });
    };
    
    
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
                    name='Departments'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className='p-3  bg-gray-100 border-2 border-gray-200 text-gray-600 rounded-4xl w-[200px] text-sm hover:border-[#24467c] transition-all duration-200'
                >
                    <option value='' data-display = "Select">Select Department</option>
                    {availableDepartments}
                </select>

                <input
                    type='date'
                    title='Select a date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='p-3 bg-gray-100 text-gray-600 rounded-4xl w-[150px] text-sm border-2 border-gray-200 hover:border-[#24467c] transition-all duration-200'
                />
                <button
                    type="button"
                    onClick={resetFilters}
                    className="px-4 py-3 bg-red-400 hover:bg-red-600 text-white text-sm rounded-4xl transition-all duration-200 hover:cursor-pointer"
                >
                    Reset Filters
                </button>
                <button
                    onClick={exportToExcel}
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-4xl transition-all duration-200"
                >
                    Export to Excel
                </button>


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
                                    <th className="py-2 font-light">Time Recorded</th>
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
