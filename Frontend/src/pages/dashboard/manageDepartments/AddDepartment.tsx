import { useAddDepartmentMutation } from "@/redux/features/department/departmentApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AddDepartment() {
    const [addDepartment] = useAddDepartmentMutation();

    const { register, handleSubmit, reset } = useForm<{
        departmentName: string;
    }>();

    const onSubmit = async (data: { departmentName: string }) => {
        try {
            await addDepartment(data).unwrap();
            console.log("Department added successfully!");
            Swal.fire({
                title: `Department added successfully!`,
                icon: "success",
                draggable: false,
            }).then(() => {
                // Refresh the page after user closes the success alert
                // window.location.reload();
                reset()
            });
        } catch (error) {
            console.error("Failed to add department:", error);
        }
    };

    return (
        <div className='w-full px-3 py-2 flex flex-col gap-2 md:gap-4 bg-white items-center justify-center h-full'>
            <form className='flex flex-col gap-4 mt-4 p-5 bg-white shadow-md rounded-md' 
                onClick= {handleSubmit(onSubmit)}

            >
                <h1 className='text-2xl '>Add Department</h1>
                <p className='text-md md:text-sm text-muted-foreground'>
                    Add a new department to the system.
                </p>
                <input
                    type='text'
                    placeholder='Department Name'
                    className='p-2 bg-gray-100 rounded-xl w-[300px] md:w-[400px] lg:w-[500px] text-md md:text-sm'
                    {...register("departmentName", { required: true })}
                />
                <button
                    type='submit'
                    className='text-md md:text-sm bg-[#24467c] text-white py-2 rounded-md hover:bg-[#DCA628] transition-all duration-200 hover:cursor-pointer w-[300px] md:w-[400px] lg:w-[500px]'
                >
                    Add Department
                </button>
            </form>
        </div>
    );
}
