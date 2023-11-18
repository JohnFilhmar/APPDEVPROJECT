import { Spinner } from "flowbite-react";

const Loading = () => {
    return ( 
        <>
        <div className="flex place-content-center">
            <Spinner style={{width: '50vw', height: '50vh'}}color="info" aria-label="Info spinner example" />
        </div>
        </>
    );
}
 
export default Loading;