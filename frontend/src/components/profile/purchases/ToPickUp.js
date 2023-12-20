import { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Spinner } from "flowbite-react";

const ToPickUp = () => {
    const [receipts, setReceipts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        const fetchReceipts = async () => {
            setLoading(true);
            try{
                const response = await axios.post(`getReceipt/${localStorage.getItem('userId')}`);
                if(response && response.data && response.data && response.data.receipts){
                    setReceipts(response.data.receipts);
                }
            } catch(error) {
                setErrors(error);
            } finally {
                setLoading(false);
            }
        }
        if(receipts === null){
            fetchReceipts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <div className="container bg-slate-50 max-h-screen h-screen overflow-auto p-2 border-solid border-4 border-gray-200">
            <div className="h-auto flex flex-col gap-2 ">
                {
                    loading && (
                        <div className="text-center">
                            <Spinner />
                        </div>
                    )
                }
                {
                    errors && (
                        <Alert color="failure">
                        <span className="font-medium">{errors.message}</span>
                        </Alert>
                    )
                }
                {
                    receipts !== null && 
                    receipts.filter(receipt => receipt.is_processed === 'TO PICK UP').map((rec, index) => (
                    <div key={index} className="border-solid border-4 rounded-md border-gray-950">
                        <div className="flex justify-between border-solid border-b-4 rounded-md border-gray-950">
                            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Receipt Number: {rec.receiptnumber}
                            </h2>
                        </div>
                        <div className="grid grid-cols-3 h-full text-center p-4">
                            {
                                rec.items.map((item,index) => (
                                <div key={index} className="col-span-3 flex flex-col justify-between">
                                    <div className="flex flex-col">
                                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                            {item.itemname}
                                        </h5>
                                        {/* <img src={`http://localhost:8080/items/${}`} alt="" /> */}
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                            Price: ₱{item.sellingprice}
                                        </div>
                                        <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                            x{item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5">Total : ₱{item.quantity * item.sellingprice}</h2>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-center border-solid border-t-4">
                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                            Status : {rec.is_processed}
                        </h2>
                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                            Date & Time Added : {rec.datetime_added}
                        </h2>
                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                            Overall Total : ₱ {rec.subtotal}
                        </h2>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
        </>
    );
}
 
export default ToPickUp;