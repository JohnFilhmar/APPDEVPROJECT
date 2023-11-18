import { Spinner } from "flowbite-react";

const Loading = () => {
    return ( 
        <>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Spinner color="info" aria-label="Info spinner example" />
        </div>
        </>
    );
}
 
export default Loading;