type AttendanceRecord = {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    department: string[]; // departments is an array
};

// Add this helper function in the same file or import it
export default function getUniqueMembersByDepartment(records: AttendanceRecord[]) {
    const departmentMap = new Map<string, Set<string>>();

    records.forEach((record) => {
        const memberId = `${record.firstName?.toLowerCase()}-${record.lastName?.toLowerCase()}-${
            record.phoneNumber
        }`;

        record.department?.forEach((dept) => {
            if (!departmentMap.has(dept)) {
                departmentMap.set(dept, new Set());
            }
            departmentMap.get(dept)?.add(memberId);
        });
        
    });

    return Array.from(departmentMap.entries()).map(([department, members]) => ({
        department,
        count: members.size,
    }));
}