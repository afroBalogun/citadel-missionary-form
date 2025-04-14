"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAttendanceQuery } from "@/redux/features/attendance/attendanceApi";
import getUniqueMembersByDepartment from "@/utils/getDepartmentMembers";

export default function DepartmentFrequencyChart() {
    const { data, isLoading, error } = useGetAttendanceQuery();

    const chartData = Array.isArray(data) ? getUniqueMembersByDepartment(data) : [];

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Department Frequency</CardTitle>
                <p className='text-sm text-muted-foreground'>
                    Distinct members per department
                </p>
            </CardHeader>
            <CardContent className='h-[300px]'>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading data.</p>
                ) : (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='department' />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey='count'
                                fill='hsl(var(--primary))'
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}

