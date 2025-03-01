import { useForm } from "react-hook-form";
import Nav from "./Nav";
import Header from "./Header";
import { useLoginAdminMutation } from "../redux/features/admin/adminApi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

interface LoginForm {
    username: string;
    password: string;
}

export default function AdminLogin(){
    const { register, handleSubmit} = useForm<{ username: string; password: string }>();
    const [loginAdmin] = useLoginAdminMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await loginAdmin(data).unwrap();
            localStorage.setItem("token", response.token); // Store token
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back",
              });
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Login failed", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid login details!",
              });
              navigate("/admin");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col ">
            <Header />
            <Nav />
            <div className="py-8 px-4 flex md:flex-grow md:place-items-center">
                <div className="h-[350px] max-w-[500px] mx-auto bg-white shadow-md rounded px-4 pt-4 pb-8 mt-20 md:h-[400px] md:mt-10 md:px-8 2xl:px-10 2xl:max-w-[800px] 2xl:h-[500px]">
                        <h2 className="p-4 text-[1.4em] text-[#383838] font-semibold md:text-4xl text-center 2xl:text-5xl">
                            Admin Dashboard Login  
                        </h2>
                        <form className=" flex flex-col p-2 gap-2 2xl:gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Username:</label>
                                <input 
                                    id="username"
                                    type="text"
                                    placeholder="Enter Admin Username" 
                                    className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                    {...register("username", { required: true })}
                                    />
                            </div>
                           
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Password:</label>
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="Enter your password" className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                    {...register("password", { required: true })}
                                    />
                            </div>

                            <button 
                                type="submit" 
                                onClick={handleSubmit(onSubmit)}
                                className="bg-[#DCA628] p-3 text-white rounded-3xl mt-4 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-200 2xl:text-xl 2xl:mt-7">
                                Login
                            </button>
                        </form>
                </div>
            </div>
        </div>
    )
}