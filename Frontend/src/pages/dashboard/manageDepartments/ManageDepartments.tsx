import { useGetAttendanceQuery } from "@/redux/features/attendance/attendanceApi";
import { useGetDepartmentsQuery, useRemoveDepartmentMutation } from "@/redux/features/department/departmentApi";
import getUniqueMembersByDepartment from "@/utils/getDepartmentMembers";
import { CiTrash } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router";

export default function ManageDepartments(){
    const { data } = useGetAttendanceQuery();
    const { data: departments } = useGetDepartmentsQuery();

    // Ensure attendance data is parsed safely
    const attendanceData = Array.isArray(data) ? getUniqueMembersByDepartment(data) : [];

    // Map for fast lookup
    const countMap = new Map(
        attendanceData.map(({ department, count }) => [department, count])
    );

    // Safely enrich departments with member count
    const enrichedDepartments = Array.isArray(departments)
    ? departments
        .map((dept) => ({
            ...dept,
            memberCount: countMap.get(dept.departmentName) || 0,
        }))
        .sort((a, b) =>
            a.departmentName.toLowerCase().localeCompare(b.departmentName.toLowerCase())
        )
    : [];


    const tableData = enrichedDepartments.map((item, index) => ({
        id: index + 1,
        _id: item._id,
        department: item.departmentName,
        count: item.memberCount,
    }));

    const [removeDepartment] = useRemoveDepartmentMutation();
    const handleRemoveDepartment = async (departmentName: string) => {
        try {
            await removeDepartment(departmentName).unwrap();
            console.log("Department removed successfully");
        } catch (error) {
            console.error("Failed to remove department:", error);
        }
    };

const tableRows = tableData.map((item) => (
    <tr key={item.id} className="w-full bg-white text-grey-800 text-center text-md md:text-sm border-b"> 
        <td className=" py-2 ">{item.id}</td>
        <td className=" py-2 hover:underline hover:cursor-pointer transition-all duration-200">{item.department}</td>
        <td className=" py-2">{item.count}</td>
        <td className=" py-2  flex justify-center gap-2">
            <button className="" title="Delete" onClick={() => handleRemoveDepartment(item._id)}>
                <CiTrash className="hover:scale-110 hover:cursor-pointer transition-all duration-200"/>
            </button>
        </td>
    </tr>
));


    
    return (
        <div className="w-full px-3 py-2 overflow-y-auto flex flex-col gap-4 h-full">
            <div className="w-full flex justify-end">
                <Link
                    to="add-department"
                    className="flex items-center gap-1 bg-[#24467c] text-white text-sm px-4 py-2 rounded-md hover:bg-[#DCA628] hover:cursor-pointer transition-all duration-200"
                >
                    <MdAdd className="text-lg" />
                    Add New Department
                </Link>
            </div>

            {/* 👇 Scroll wrapper only for the table */}
            <div className="w-full overflow-x-auto">
                <table className="w-[800px] md:w-full bg-white shadow-md rounded-xl">
                    <thead>
                        <tr className="bg-gray-100 text-grey-800 text-md md:text-sm text-center">
                            <th className="py-2 font-light">S/N</th>
                            <th className="py-2 font-light">Department Name</th>
                            <th className="py-2 font-light">Number of Members</th>
                            <th className="py-2 font-light">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>

    )
}