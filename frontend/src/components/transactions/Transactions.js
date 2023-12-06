import React, { useEffect, useState } from 'react';
import { TextInput } from 'flowbite-react';
import { CiSearch } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import useGetTransactions from './useGetTransactions';
import axios from 'axios';

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { response } = useGetTransactions();

  useEffect(() => {
    if (response) {
      const processingOrders = response.filter((order) => order.is_processed === "PROCESSING");
      setOrders(processingOrders);
    }
  }, [response]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const calculateOrderTotal = (orderItems) => {
    return orderItems.reduce((total, item) => {
      return total + item.sellingprice * item.quantity;
    }, 0);
  };

  const getStatus = (order) => {
    return order.is_processed;
  };

  const getTimeProcessed = (order) => {
    return order.datetime_processed || '';
  };

  const getDateTimeAdded = (order) => {
    const rawDateTime = new Date(order.datetime_added);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return rawDateTime.toLocaleDateString('en-US', options);
  };

  const handleDelete = async (order) => {
    try {
      const checkout = await axios.delete(`Checkout/${order.receiptnumber}`);
      console.log(checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = searchQuery
    ? orders.filter((order) => order.receiptnumber.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders;

  return (
    <>
      <div className="w-full mb-3 mt-5">
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <TextInput
            type="number"
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="You can search by receipt number or any other criteria"
            className="pl-10"
          />
        </div>
      </div>
      <div className="container bg-slate-50">
        <div className="h-auto flex flex-col gap-2 ">
          {filteredOrders.map((order,index) => (
            <div key={index} className="border-solid border-4 rounded-md border-gray-950">
              <div className="flex justify-between border-solid border-b-4 rounded-md border-gray-950">
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Requester : {order.userName}
                </h2>
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                  Receipt Number: {order.receiptnumber}
                </h2>
                <button onClick={() => handleDelete(order)}>
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
              {order.items.map((item) => (
                <>
                  <div key={item.id} className="grid grid-cols-4 h-full text-center p-4">
                    <div className="col-span-1 flex items-center justify-center">
                        <img
                        src={`http://localhost:8080/uploads/${item.image}`}
                        alt={item.itemname}
                        className="object-cover w-20 h-20 rounded-full"
                        />
                    </div>
                    <div className="col-span-3 flex flex-col justify-between">
                        <div>
                            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.itemname}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Compatibility: {item.compatibility}
                            </p>
                        </div>
                        <div className="flex justify-between mt-2">
                            <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Price: ₱{item.sellingprice}
                            </div>
                            <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Quantity: {item.quantity}{item.quantity > 1 ? "pcs" : "pc"}
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                      <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5">Total : ₱{item.sellingprice * item.quantity}</h2>
                  </div>
                </>
              ))}
              <div className="flex justify-center border-solid border-t-4">
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                  Status : {getStatus(order)}
                </h2>
                {getStatus(order) === 'PROCESSED' && (
                  <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                    Date & Time Processed : {getTimeProcessed(order)}
                  </h2>
                )}
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                  Date & Time Added : {getDateTimeAdded(order)}
                </h2>
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">
                  Overall Total : ₱{calculateOrderTotal(order.items)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
