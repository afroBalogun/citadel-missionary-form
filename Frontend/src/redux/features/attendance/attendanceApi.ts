import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

// Define attendance data structure
export interface Attendance {
    id: string;
    firstName: string;
    lastName: string;
    department: string[];
    date: string;
    gender: 'male' | 'female';
    phoneNumber: string;
}

// Define API responses
export interface AttendanceResponse {
    data: Attendance[];
    success?: boolean;
    count?: number;
}


// Base query setup
const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/attendance`,
    credentials: 'include',
});

// Create attendance API slice
const attendanceApi = createApi({
    reducerPath: 'attendanceApi', // Ensure unique name
    baseQuery,
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({
        getAttendance: builder.query<AttendanceResponse, void>({
            query: () => '/',
            providesTags: ['Attendance'],
        }),
        getAttendanceByParameter: builder.query<AttendanceResponse, { department?: string; date?: string; gender?: string; name?:string}>({
            query: ({ department, date, gender, name }) => {
                const params = new URLSearchParams();
                if (department) params.append('department', department);
                if (date) params.append('date', date);
                if (gender) params.append('gender', gender);
                if(name) params.append('name', name);
                return `/find-attendance?${params.toString()}`;
            },
            providesTags: ['Attendance'],
        }),
        addAttendance: builder.mutation<void, Attendance>({
            query: (data) => ({
                url: '/submit-attendance',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Attendance'],
        }),
    }),
});

// Export hooks
export const { useGetAttendanceQuery, useGetAttendanceByParameterQuery, useAddAttendanceMutation } = attendanceApi;
export default attendanceApi;
