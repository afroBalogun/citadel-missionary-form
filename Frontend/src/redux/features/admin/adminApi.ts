import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

export interface Admin {
    id?: string;
    username: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    admin: {
        username: string;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/admin`,
    credentials: "include",
});

const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery,
    tagTypes: ["Admin"],
    endpoints: (builder) => ({
        loginAdmin: builder.mutation<AuthResponse, Omit<Admin, "id">>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
        }),
        registerAdmin: builder.mutation<void, Admin>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Admin"],
        }),
    }),
});

export const { useLoginAdminMutation, useRegisterAdminMutation } = adminApi;
export default adminApi;
