import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const PromptError = () => {
    return (
        <>
            <Alert className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error ! </span>Something have gone wrong.
            </Alert>
        </>
    );
}
 
export default PromptError;