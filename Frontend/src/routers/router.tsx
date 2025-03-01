import { createBrowserRouter } from "react-router";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/home/DashboardLayout";
import AdminDashboard from "../pages/dashboard/home/AdminDashboard";
import ManageRecords from "../pages/dashboard/manageRecords/ManageRecords";
import ManageDepartments from "../pages/dashboard/manageDepartments/ManageDepartments";
import AdminRoute from "./AdminRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
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
                element: <AdminRoute> <ManageDepartments /> </AdminRoute>,
            },
        ],
    },
]);

export default router;
