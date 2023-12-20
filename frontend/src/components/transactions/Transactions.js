import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { CiSearch } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import PopupMessage from '../PopupMessage';
import { TiStar } from 'react-icons/ti';

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('getCheckout');
              setOrders(response.data);
          } catch (error) {
              setMessage(error);
          }
      };
      fetchData();
  }, []);

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
    if(order.datetime_processed !== null){
      const rawDateTime = new Date(order.datetime_processed);
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
    } else {
      return null;
    }
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
      await axios.post(`deleteCheckout/${order.receiptnumber}`);
      setMessage('Receipt Deleted!');
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.filter((o) => o.receiptnumber !== order.receiptnumber);
        return updatedOrders;
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleProcess = async (order) => {
    try {
      await axios.post(`processCheckout/${order.receiptnumber}`);
      const updatedData = await axios.get('getCheckout');
      setOrders(updatedData.data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const acceptReturn = async (order) => {
    try {
      await axios.post(`acceptReturn/${order.receiptnumber}`);
      const updatedData = await axios.get('getCheckout');
      setOrders(updatedData.data);
    } catch (error) {
      setMessage(error.message);
    }
  }
  const denyReturn = async (order) => {
    try {
      await axios.post(`denyReturn/${order.receiptnumber}`);
      const updatedData = await axios.get('getCheckout');
      setOrders(updatedData.data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  const filteredOrders = searchQuery
    ? orders.filter((order) => order.receiptnumber.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders;

  return (
    <>
      { message && <PopupMessage type="success" message={message}/> }
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
      <div className="flex flex-col gap-4 border-2 border-gray-600 rounded-md bg-gray-500 max-h-screen h-screen overflow-auto">
        {filteredOrders.sort((a,b) => b.is_processed.charAt(0).charCodeAt(0) - 
          a.is_processed.charAt(0).charCodeAt(0))
          .map((order, index) => (
          <div key={index} className="border-4 rounded-md border-gray-950 m-2 bg-red-300">
            <div className="flex justify-between border-b-4 rounded-md border-gray-950 pb-2">
              <h2
                onClick={() => {
                  console.log(order);
                }}
                className="text-md font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Requester: {order.userName}
              </h2>
              <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-center">
                <span>Receipt Number: {order.receiptnumber}</span>
                {
                  order.is_processed === 'COMPLETE' && (
                      <div className="flex items-center justify-center p-2">
                          {[1,2,3,4,5].map((star, index) => (
                          <p
                              key={index}
                              className={`p-1 rounded-md font-bold text-md ${
                              index + 1 <= order.rate
                                  ? 'bg-yellow-200 hover:text-gray-700 text-gray-700'
                                  : 'text-yellow-200 bg-yellow-200'
                              }`}
                          >
                              <TiStar />
                          </p>
                          ))}
                      </div>
                  )
              }
              </h2>
              <button onClick={() => handleDelete(order)}>
                <MdDelete className="w-5 h-5" />
              </button>
            </div>
            {order.items.map((item) => (
              <div key={item.id} className="grid grid-cols-3 text-center p-4 ">
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.itemname}
                    </h5>
                    {
                      order.is_processed === 'COMPLETE' && (
                        <div className="flex items-center justify-center p-2">
                          {[1,2,3,4,5].map((star,index) => (
                            <p
                              key={index} 
                              className={`p-1 rounded-md font-bold text-md ${
                                index + 1 <= item.rate 
                                  ? 'bg-yellow-200 hover:text-gray-700 text-gray-700'
                                  : 'text-yellow-200 bg-yellow-200'
                              }`}
                            >
                              <TiStar />
                            </p>
                          ))}
                        </div>
                      )
                    }
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      Price: ₱{item.sellingprice}
                    </div>
                    <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      x{item.quantity}
                      {item.quantity > 1 ? "pcs" : "pc"}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5">
                      Total : ₱{item.sellingprice * item.quantity}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center border-t-4 pt-2">
              <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-4">
                Status : {getStatus(order)}
              </h2>
              {order.datetime_processed !== null && (
                <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-4">
                  Date & Time Processed : {getTimeProcessed(order)}
                </h2>
              )}
              <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-4">
                Date & Time Added : {getDateTimeAdded(order)}
              </h2>
              <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-4">
                Overall Total : ₱{calculateOrderTotal(order.items)}
              </h2>
              {
                order.is_processed !== 'COMPLETE' && order.is_processed !== 'TO RETURN' && order.is_processed !== 'RETURN DENIED' && order.is_processed !== 'REPLACED' && (
                  <button className="border-2 border-gray-950 bg-gray-400 rounded-md m-2 p-2" onClick={() => handleProcess(order)}>
                    Process
                  </button>
                )
              }
              {
                order.is_processed === 'TO RETURN' && (
                  <>
                    <Button color='success' className="m-2" onClick={() => acceptReturn(order)}>
                      Accept
                    </Button>
                    <Button color='failure' className="m-2" onClick={() => denyReturn(order)}>
                      Deny
                    </Button>
                  </>
                )
              }
            </div>
          </div>
        ))}
      </div>

      </div>
    </>
  );
};

export default Transactions;
