export default function Vigil() {
    return(
        <div className="">
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-center">Vigil Attendance Form</h1>
                    <p className="text-center">Please fill out the form below to mark your attendance.</p>
                    {/* Add your form component here */}
                </div>
                <footer className="bg-gray-800 text-white text-center py-4">
                    <p>&copy; 2023 Vigil. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}