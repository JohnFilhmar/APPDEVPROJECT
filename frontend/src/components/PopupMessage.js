import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const PopupMessage = ({ message, type }) => {

  const renderAlert = () => {
    if (type === "fail") {
      return (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Error!</span> {message}.
        </Alert>
      );
    } else {
      return (
        <Alert color="success">
          <span className="font-medium">Success!</span> {message}.
        </Alert>
      );
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        {renderAlert()}
      </div>
    </>
  );
};

export default PopupMessage;
