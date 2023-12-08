import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import useAddCheckOut from "./useAddCheckout";
// import Loading from '../Loading';

const Checkout = ({ data, state }) => {
    const [openModal, setOpenModal] = useState(state);
    const [receiptData, setReceipt] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([]);
    // eslint-disable-next-line
    const { error:checkoutError, loading, postRequest } = useAddCheckOut();
  
    useEffect(() => {
      setOpenModal(state);
      setReceipt(JSON.parse(data));
    }, [state, data]);
  
    useEffect(() => {
      if (state && receiptData && receiptData.length > 0) {
        setCheckboxStates(Array(receiptData.length).fill(true));
      }
    }, [state, receiptData]);

    const calculateOverallTotal = () => {
        return receiptData.reduce((total, item) => total + item.sellingprice * item.quantity, 0);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const proceedCheckOut = async (e) => {
        e.preventDefault();
        try {
            // const formData = {
            //     customer : localStorage.getItem('userId'),
            //     items : localStorage.getItem('toCheckOutItems'),
            //     subtotal : calculateOverallTotal(),
            // }
            const formData = new FormData();
            formData.append('customer',localStorage.getItem('userId'));
            formData.append('items',(localStorage.getItem('toCheckOutItems')));
            formData.append('subtotal',calculateOverallTotal());

            const response = await postRequest(formData);
        
            localStorage.removeItem('cart');
            setReceipt([]);
            setOpenModal(false);
            // console.log("Checkout Successful", JSON.stringify(response.data));
            console.log('Check out clicked', localStorage.getItem('toCheckOutItems'), formData, response);
            localStorage.removeItem('toCheckOutItems');
        }catch(error){
            console.error("Checkout Failed", checkoutError, error);
        }
    }

    return (
        <>
        <Modal show={openModal} size='lg' onClose={closeModal}>
            <Modal.Header>
            <h2 className="text-2xl font-bold text-center">Receipt</h2>
            </Modal.Header>
            <Modal.Body className="text-center checkout text-xs md:text-sm lg:text-sm">
            <div className="border-4">
                <div className="grid grid-cols-5 gap-2 border-b pb-2 bg-gray-400">
                    <div className="font-light">Actions</div>
                    <div className="font-light">Item</div>
                    <div className="font-light">Price</div>
                    <div className="font-light">Quantity</div>
                    <div className="font-light">Total</div>
                </div>
                {receiptData &&
                receiptData.map((item, index) => (
                    <React.Fragment key={index}>
                    <div className="grid grid-cols-5 gap-4 py-2 border-b ">
                        <button
                            onClick={() =>
                            setCheckboxStates((prev) => {
                                const newStates = [...prev];
                                newStates[index] = !newStates[index];
                                return newStates;
                            })
                            }
                            className="flex items-center justify-center"
                        >
                            {checkboxStates[index] ? (
                            <ImCheckboxChecked />
                            ) : (
                            <ImCheckboxUnchecked />
                            )}
                        </button>
                        <div>{item.itemname}</div>
                        <div>₱{item.sellingprice}</div>
                        <div>{item.quantity}{item.quantity > 1 ? "pcs" : "pc"}</div>
                        <div>₱{item.sellingprice * item.quantity}</div>
                        <div>
                        </div>
                    </div>
                    </React.Fragment>
                ))}
                {receiptData && receiptData.length > 0 && (
                <div className="grid grid-cols-5 gap-4 py-2 mt-4">
                    <div className="col-span-4 font-light text-right">Overall Total :</div>
                    <div className="font-bold">₱{calculateOverallTotal()}</div>
                </div>
                )}
                {receiptData && receiptData.length === 0 && (
                <>
                    <div className="col-span-4 text-center mt-4">No items to display</div>
                    <div className="col-span-4 text-center mt-4"><button onClick={closeModal} className="text-red-900 hover:underline">Go Back</button></div>
                </>
                )}
            </div>
            <div className="flex justify-end mt-3">
                {
                    receiptData && receiptData.length > 0 ? (
                        <>
                            <Button
                                className="text-white bg-slate-800 mr-2"
                                onClick={proceedCheckOut}
                            >
                                Proceed
                            </Button>
                            <Button
                                className="text-white bg-slate-800"
                                onClick={() => setOpenModal(false)}
                            >
                                Get Back
                            </Button>
                        </>
                    ) : ""
                }
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default Checkout;
