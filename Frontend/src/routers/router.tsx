import { createBrowserRouter } from "react-router";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/home/DashboardLayout";
import AdminDashboard from "../pages/dashboard/home/AdminDashboard";
import ManageRecords from "../pages/dashboard/manageRecords/ManageRecords";
import ManageDepartments from "../pages/dashboard/manageDepartments/ManageDepartments";
import AddDepartment from "../pages/dashboard/manageDepartments/AddDepartment";
import AdminRoute from "./AdminRoute";
import Home from "../pages/Home/Home";
import AttendanceForm from "../pages/MissionaryForce/AttendanceForm";
import CheckInOut from "../pages/MissionaryForce/CheckInOut";
import MFLayout from "../pages/MissionaryForce/MFLayout";
import Vigil from "@/pages/Vigil/Vigil";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/",
        element: <MFLayout />,
        children: [
            {
                path: "check-in-out",
                element: <CheckInOut />
            },
            {
                path: "attendance-form",
                element: <AttendanceForm />
            }  
        ]
    },
    {
        path: "/missionary-vigil",
        element: <Vigil />,
    },
    {
        path: "/auth/admin",
        element: <AdminLogin />,
    },
    {
        path: "/admin/dashboard",
        element: <AdminRoute> <DashboardLayout /> </AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute> <AdminDashboard /> </AdminRoute>,
            },
            {
                path: "manage-records",
                element: <AdminRoute> <ManageRecords /> </AdminRoute>,
            },
            {
                path: "manage-departments",
                children: [
                    {
                        path: "",
                        element: <AdminRoute> <ManageDepartments /> </AdminRoute>,
                    },
                    {
                        path: "add-department",
                        element: <AdminRoute> <AddDepartment /> </AdminRoute>,
                    }
                ]
            },
        ],
    },
]);

export default router;
