import { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Button, Label, Modal, Spinner, Textarea } from "flowbite-react";
import { FcCancel } from "react-icons/fc";

const All = () => {
    const [receipts, setReceipts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [modalStates, setModalStates] = useState([]);
    
    useEffect(() => {
        if (receipts !== null) {
        const newModalStates = receipts.receipts.map(() => false);
        setModalStates(newModalStates);
        }
    }, [receipts]);

    const handleReturn = (index) => {
        const newModalStates = [...modalStates];
        newModalStates[index] = true;
        setModalStates(newModalStates);
    };
    
    useEffect(() => {
        const fetchReceipts = async () => {
            setLoading(true);
            try{
                const response = await axios.post(`getReceipt/${localStorage.getItem('userId')}`);
                if(response && response.data){
                    setReceipts(response.data);
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
    },[closeModal])

    function closeModal(index){
        const newModalStates = [...modalStates];
        newModalStates[index] = false;
        setModalStates(newModalStates);
    }

    const [reason, setReason] = useState("");
    const handleSubmitReturn = async (e, receiptnumber, index) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('reason', reason);
            const response = await axios.postForm(`requestReturn/${receiptnumber}`,formData);
            console.log(response.data);
            closeModal(index);
            setReason("");
        } catch(error) {
            console.log(error.message);
            setReason("");
        }
    }

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
                    receipts.receipts.sort((a,b) => b.is_processed.charAt(0).charCodeAt(0) - 
                    a.is_processed.charAt(0).charCodeAt(0))
                    .map((rec, index) => (
                        <div key={index} className="border-solid border-4 rounded-md border-gray-950">
                            <div className="flex justify-between border-solid border-b-4 rounded-md border-gray-950">
                                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                    Receipt Number: {rec.receiptnumber}
                                </h2>
                                {
                                    rec.is_processed !== 'COMPLETE' && (
                                        <button>
                                            <FcCancel className="w-5 h-5" />
                                        </button>
                                    )
                                }
                                {
                                    rec.is_processed === 'COMPLETE' && (
                                        <Button color="failure" onClick={() => handleReturn(index)}>
                                            Return Item/s
                                        </Button>
                                    )
                                }
                            </div>
                            <div className="grid grid-cols-3 h-full text-center p-4">
                                {
                                    rec.items.map((item,index) => (
                                    <div key={index} className="col-span-3 flex flex-col justify-between">
                                        <div className="flex flex-col">
                                            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                                {item.itemname}
                                            </h5>
                                            {/* <img src={`https://jmseshop.shop/backend/public/items/${}`} alt="" /> */}
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
                            <Modal show={modalStates[index]} onClose={() => closeModal(index)}>
                                <form onSubmit={(e) => handleSubmitReturn(e,rec.receiptnumber,index)}>
                                    <Modal.Header>Reason Of Return </Modal.Header>
                                    <Modal.Body>
                                        <div className="max-w-md justify-center items-center text-center container mx-auto">
                                            <div className="mb-2 block">
                                                <Label htmlFor="reason" value="Your message" />
                                            </div>
                                            <Textarea 
                                                id="reason" 
                                                placeholder="Enter your reason to return this item..." 
                                                required 
                                                rows={4} 
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                            />
                                            <p className="font-light text-md text-gray-500">You are to return at the store with the items on hand to replace the items on the site.</p>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit">Submit</Button>
                                        <Button color="gray" onClick={() => closeModal(index)}>
                                        Cancel
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    );
}
 
export default All;