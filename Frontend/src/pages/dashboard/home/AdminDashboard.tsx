import AttendanceChart from "@/components/AttendanceChart";
import { useGetAttendanceQuery } from "../../../redux/features/attendance/attendanceApi";
import { useGetDepartmentsQuery } from "@/redux/features/department/departmentApi";
import DepartmentFrequencyChart from "@/components/DepartmentChart";

export default function AdminDashboard() {
    const { data: attendanceResponse } = useGetAttendanceQuery();
    const { data: departmentsResponse } = useGetDepartmentsQuery();

    const attendanceData = Array.isArray(attendanceResponse)
        ? attendanceResponse
        : attendanceResponse?.data
        ? attendanceResponse.data
        : [];

    const departmentsData = Array.isArray(departmentsResponse)
        ? departmentsResponse
        : departmentsResponse?.data
        ? departmentsResponse.data
        : [];

    console.log("Extracted attendance data:", attendanceData);
    console.log("Extracted departments data:", departmentsData);

    const getUniqueMemberCount = (records: any[]) => {
        const uniquePhoneNumbers = new Set(
            records.map((record) => record.phoneNumber)
        );
        return uniquePhoneNumbers.size;
    };
    const uniqueMemberCount = getUniqueMemberCount(attendanceData);

    const cardItems = [
        {
            cardTitle: "Total Attendance",
            cardValue: attendanceData.length,
            cardDescription: "More missionary Force members",
            cardSubDescription: "Records for the last 6 months",
        },
        {
            cardTitle: "Force Members in Record",
            cardValue: uniqueMemberCount,
            cardDescription: "More missionary Force members",
            cardSubDescription: "",
        },
        {
            cardTitle: "Total Departments Accounted for",
            cardValue: departmentsData.length,
            cardDescription: "All departments accounted for",
            cardSubDescription: "Total number of departments",
        },
    ];

    const cards = cardItems.map((item, index) => {
        return (
            <div
                key={index}
                className='w-full flex flex-col gap-2 border-2 border-grey-300 text-gray-800 p-4 rounded-lg hover:shadow-md hover:-translate-y-1 hover:cursor-pointer transition-all duration-200'
            >
                <p className=' font-bold'>{item.cardTitle}:</p>
                <h2 className='text-4xl font-bold text-[#24467c]'>
                    {item.cardValue}
                </h2>
                <p className='text-sm text-gray-500 font-bold'>
                    {item.cardDescription}
                </p>
                <p className='text-sm font-bold'>{item.cardSubDescription}</p>
            </div>
        );
    });

    return (
        <div className='py-2 px-3 overflow-y-auto flex flex-col gap-4 h-full'>
            <div className='  my-4'>
                <div className='flex flex-col gap-2 border-b-[1px] border-grey-300 pb-2'>
                    <h1 className='text-2xl font-bold text-[#24467c] capitalize  '>
                        Admin Dashboard
                    </h1>
                    <p className='text-sm text-gray-500'>Attendance Records</p>
                </div>
            </div>

            <section className='w-full   flex flex-col lg:flex-row gap-4 '>
                {cards}
            </section>

            <div className='  py-2 flex flex-col md:flex-row gap-4'>
                <AttendanceChart />
                <DepartmentFrequencyChart />
            </div>
        </div>
    );
}
