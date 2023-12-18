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
        return JSON.parse(localStorage.getItem('toCheckOutItems')).reduce((total, item) => total + item.sellingprice * item.quantity, 0);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleCheckboxClick = (index) => {
        setCheckboxStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            const itemsInLocalStorage = JSON.parse(localStorage.getItem('toCheckOutItems')) || [];
    
            if (newStates[index]) {
                itemsInLocalStorage.push(receiptData[index]);
            } else {    
                // Item is unchecked, remove it from the toCheckOutItems
                const itemIndexToRemove = itemsInLocalStorage.findIndex(item => item.id === receiptData[index].id);
                if (itemIndexToRemove !== -1) {
                }
            }
            localStorage.setItem('toCheckOutItems', JSON.stringify(itemsInLocalStorage));
            return newStates;
        });
    };
        
    const proceedCheckOut = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('customer', localStorage.getItem('userId'));
            formData.append('items', localStorage.getItem('toCheckOutItems'));
            formData.append('subtotal', calculateOverallTotal());
            const response = await postRequest(formData);
            setReceipt([]);
            setOpenModal(false);
            console.log('Check out clicked', localStorage.getItem('toCheckOutItems'), formData, response);
        
            // Remove checked items from the cart
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const checkedItemIds = checkboxStates.reduce((ids, isChecked, index) => {
                if (isChecked) {
                ids.push(receiptData[index].id);
                }
                return ids;
            }, []);
        
            const updatedCart = cartItems.filter(item => !checkedItemIds.includes(item.id));
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        
            localStorage.removeItem('toCheckOutItems');
        } catch (error) {
            console.error("Checkout Failed", checkoutError, error);
        }
    };

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
                        onClick={() => handleCheckboxClick(index)}
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
