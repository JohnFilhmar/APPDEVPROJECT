/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from 'axios';
import { Alert, Button, Label, Modal, Spinner, Textarea } from "flowbite-react";
import { TiStar } from "react-icons/ti";

const All = () => {
    const [receipts, setReceipts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [modalStates, setModalStates] = useState([]);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [itemRating, setItemRating] = useState([]);
    
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
    
    useEffect(() => {
        if(receipts === null){
            fetchReceipts();
        }
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
    
    const handleReceiptRate = async (e, id, rating) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('rate', rating);
            const response = await axios.postForm(`rateReceiptCheckout/${id}`, formData);
            setHoveredStar(response.data.rating);
            fetchReceipts();
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleProductRate = async (e, id, rating, itemIndex) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('rate', rating);
            formData.append('itemIndex', itemIndex);
            console.log(itemIndex);
            const response = await axios.postForm(`rateProductCheckout/${id}`, formData);
            console.log(response);
            setItemRating((prevItemRating) => {
                const newItemRating = [...prevItemRating];
                newItemRating[itemIndex] = rating;
                return newItemRating;
            });
            fetchReceipts();
        } catch (error) {
            console.log(error);
        }
    };

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
                                    rec.is_processed === 'COMPLETE' && (
                                        <Button color="failure" onClick={() => handleReturn(index)}>
                                            Return Item/s
                                        </Button>
                                    )
                                }
                            </div>
                            <div className="grid grid-cols-3 h-full text-center p-4">
                                {
                                  rec.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="col-span-3 flex flex-col justify-between">
                                      <div className="flex flex-col">
                                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                          {item.itemname}
                                        </h5>
                                        {rec.is_processed === 'COMPLETE' && (
                                          <div className="flex items-center justify-center p-2">
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                              <button
                                                key={index}
                                                className={`p-1 rounded-md font-bold text-md ${
                                                  index + 1 <= itemRating[itemIndex]
                                                    ? 'bg-yellow-200 hover:text-gray-700 text-gray-700'
                                                    : 'text-yellow-200 bg-yellow-200'
                                                }`}
                                                onMouseEnter={() =>
                                                  setItemRating((prev) => {
                                                    const newRating = [...prev];
                                                    newRating[itemIndex] = index + 1;
                                                    return newRating;
                                                  })
                                                }
                                                onMouseLeave={() =>
                                                  setItemRating((prev) => {
                                                    const newRating = [...prev];
                                                    newRating[itemIndex] = item.rate;
                                                    return newRating;
                                                  })
                                                }
                                                onClick={(e) => handleProductRate(e, rec.receiptnumber, index + 1, itemIndex)}
                                              >
                                                <TiStar />
                                              </button>
                                            ))}
                                          </div>
                                        )}
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
                                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5">
                                          Total : ₱{item.quantity * item.sellingprice}
                                        </h2>
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
                            {
                                rec.is_processed === 'COMPLETE' && (
                                    <div className="flex items-center justify-center p-2">
                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                        <button
                                            key={index}
                                            className={`p-1 rounded-md font-bold text-md ${
                                            index + 1 <= hoveredStar
                                                ? 'bg-yellow-200 hover:text-gray-700 text-gray-700'
                                                : 'text-yellow-200 bg-yellow-200'
                                            }`}
                                            onMouseEnter={() => setHoveredStar(index + 1)}
                                            onMouseLeave={() => {if(rec.rate === 0){setHoveredStar(0)}else{setHoveredStar(rec.rate)}}}
                                            onClick={(e) => handleReceiptRate(e,rec.receiptnumber, index + 1)}
                                        >
                                            <TiStar />
                                        </button>
                                        ))}
                                    </div>
                                )
                            }
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