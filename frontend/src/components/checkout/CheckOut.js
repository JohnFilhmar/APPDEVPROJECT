import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Checkout = ({ data, state }) => {
  const [openModal, setOpenModal] = useState(state);
  const [receiptData, setReceipt] = useState([]);
  const [warningModal, setWarningModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);

  useEffect(() => {
    setOpenModal(state);
    setReceipt(JSON.parse(data));
  }, [state, data]);

  const calculateOverallTotal = () => {
    return receiptData.reduce((total, item) => total + item.sellingprice * item.quantity, 0);
  };

  const closeModal = () => {
    setReceipt([]);
    setOpenModal(false);
    localStorage.removeItem('toCheckOutItems');
  };

  const removeItem = (index) => {
    setRemoveIndex(index);
    setWarningModal(true);
  };

  const confirmRemove = () => {
    if (removeIndex !== null) {
      const updatedItems = [...receiptData.slice(0, removeIndex), ...receiptData.slice(removeIndex + 1)];
      setReceipt(updatedItems);
      setRemoveIndex(null);
      setWarningModal(false);
    }
  };

  return (
    <>
      <Modal show={openModal} size='md' onClose={closeModal}>
        <Modal.Header>
          <h2 className="text-2xl font-bold text-center">Receipt</h2>
        </Modal.Header>
        <Modal.Body className="text-center checkout text-xs md:text-sm lg:text-sm">
          <div className="border-4">
            <div className="grid grid-cols-5 gap-2 border-b pb-2 bg-gray-400">
              <div className="font-light">Item</div>
              <div className="font-light">Price</div>
              <div className="font-light">Quantity</div>
              <div className="font-light">Total</div>
              <div className="font-light">Action</div>
            </div>
            {receiptData &&
              receiptData.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="grid grid-cols-5 gap-4 py-2 border-b">
                    <div>{item.itemname}</div>
                    <div>₱{item.sellingprice}</div>
                    <div>{item.quantity}{item.quantity > 1 ? "pcs" : "pc"}</div>
                    <div>₱{item.sellingprice * item.quantity}</div>
                    <div>
                      <button onClick={() => removeItem(index)} className="text-red-900 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            {receiptData && receiptData.length > 0 && (
              <div className="grid grid-cols-5 gap-4 py-2 mt-4">
                <div className="col-span-3 font-light text-right">Overall Total :</div>
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
        </Modal.Body>
      </Modal>
      <Modal show={warningModal} size="sm" onClose={() => setWarningModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmRemove}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setWarningModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Checkout;
