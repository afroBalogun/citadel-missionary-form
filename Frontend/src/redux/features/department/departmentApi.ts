import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

export interface Department {
    departmentName: string;
}

export interface DepartmentResponse {
    data: Department[];
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/departments`,
    credentials: 'include',
});

const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery,
    tagTypes: ['Department'],
    endpoints: (builder) => ({
        getDepartments: builder.query<DepartmentResponse, void>({
            query: () => '/',
            providesTags: ['Department'],
        }),
        addDepartment: builder.mutation<void, Department>({
            query: (data) => ({
                url: '/add-department',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Department'],
        }),
        removeDepartment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/remove-department/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Department'],
        })
    })
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation, useRemoveDepartmentMutation } = departmentApi;
export default departmentApi;