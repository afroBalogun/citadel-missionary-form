import { useState } from "react";
import Form from "../../components/Form";

export default function AttendanceForm(){
    const [isLocationValid, setIsLocationValid] = useState(true);

    return(
        <div className="flex flex-col flex-grow">
            <Form
                isLocationValid = {isLocationValid}
                setIsLocationValid = {setIsLocationValid}
                additionalDepartments = {[]} 
            />
        </div>
    )
}