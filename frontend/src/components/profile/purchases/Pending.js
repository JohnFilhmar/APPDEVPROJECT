import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import useGetCheckOut from "../useGetCheckout";
import useProducts from "../../../hooks/useProducts";

const Pending = () => {
    // eslint-disable-next-line
    const { products, loading: loadingProducts, error: errorProducts } = useProducts();
    // eslint-disable-next-line
    const { response, error, loading } = useGetCheckOut();
    const [list, setList] = useState([]);
    const [groupedItems, setGroupedItems] = useState({});

    useEffect(() => {
        // Combine response items and product information, grouped by receipt number
        setGroupedItems(response.reduce((acc, item) => {
            const itemsInReceipt = JSON.parse(item.items);
            itemsInReceipt.forEach((receiptItem) => {
                const productInfo = products.find((product) => product.id === receiptItem.id);
                const newItem = {
                ...receiptItem,
                productInfo,
                receiptNumber: item.receiptnumber,
                };

                // Group items by receipt number
                if (!acc[item.receiptnumber]) {
                acc[item.receiptnumber] = [];
                }
                acc[item.receiptnumber].push(newItem);
            });
            return acc;
        }, {}));

        setList(groupedItems);
        // eslint-disable-next-line
    }, [response, products]);

    const search = (query) => {
        if (!query) {
            setList(groupedItems);
            return;
        }
    
        const results = Object.values(list)
        .flat()
        .filter((item) => item.receiptNumber.toLowerCase().includes(query.toLowerCase()));
    
        setList((prevList) => ({
        ...prevList,
        searchResults: results,
        }));
    };
    
    const calculateSubtotal = (items) => {
        return items.reduce((subtotal, item) => {
        return subtotal + item.productInfo?.sellingprice * item.quantity;
        }, 0);
    };

    const calculateReceiptTotal = (receiptItems) => {
        return calculateSubtotal(receiptItems);
    };
    
    const getDateTimeAdded = (receiptNumber) => {
        const foundReceipt = response.find((item) => item.receiptnumber === receiptNumber);
    
        if (foundReceipt) {
            const rawDateTime = new Date(foundReceipt.datetime_added);
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            return rawDateTime.toLocaleDateString('en-US', options);
        }
    
        return '';
    };

    const getStatus = (receiptNumber) => {
        const foundReceipt = response.find((item) => item.receiptnumber === receiptNumber)
        if (foundReceipt) {
            return foundReceipt.is_processed;
        }
        return '';
    }
    
    const filterPendingReceipts = (receiptItems) => {
      return receiptItems.filter((item) => getStatus(item.receiptNumber) === 'PROCESSING');
    };

    return (
        <>
        <div className="w-full mb-3">
            <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <TextInput
                type="text"
                id="search"
                onChange={(e) => search(e.target.value)}
                placeholder="You can search by item name, branch, order ID, or category"
                className="pl-10"
            />
            </div>
        </div>
        <div className="container bg-slate-50">
            <div className="h-auto flex flex-col gap-2">
            {list.searchResults
                ? list.searchResults.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 h-full text-center p-4">
                        <div className="col-span-1 flex items-center justify-center">
                            <img
                            src={`http://localhost:8080/uploads/${item.productInfo?.image}`}
                            alt={item.productInfo?.itemname}
                            className="object-cover w-20 h-20 rounded-full"
                            />
                        </div>
                        <div className="col-span-3 flex flex-col justify-between">
                            <div>
                            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.productInfo?.itemname}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Compatibility: {item.productInfo?.compatibility}
                            </p>
                            </div>
                            <div className="flex justify-between mt-2">
                            <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                ₱{item.productInfo?.sellingprice}
                            </div>
                            <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Quantity: {item.quantity}{item.quantity > 1 ? "pcs" : "pc"}
                            </div>
                            </div>
                        </div>
                    </div>
                ))
                : Object.entries(list).map(([receiptNumber, receiptItems]) => {
                    const pendingReceiptItems = filterPendingReceipts(receiptItems);
                    return pendingReceiptItems.length > 0 && (
                    <div className="border-solid border-4 rounded-md border-gray-950" key={receiptNumber}>
                        <div>
                            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white border-solid border-b-4">Receipt Number: {receiptNumber}</h2>
                            {receiptItems.map((item) => (
                                <div key={item.id}>
                                    <div className="grid grid-cols-4 h-full text-center p-4">
                                        <div className="col-span-1 flex items-center justify-center">
                                            <img
                                            src={`http://localhost:8080/uploads/${item.productInfo?.image}`}
                                            alt={item.productInfo?.itemname}
                                            className="object-cover w-20 h-20 rounded-full"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-between">
                                            <div>
                                                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {item.productInfo?.itemname}
                                                </h5>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Compatibility: {item.productInfo?.compatibility}
                                                </p>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                                    ₱{item.productInfo?.sellingprice}
                                                </div>
                                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                                    Quantity: {item.quantity}{item.quantity > 1 ? "pcs" : "pc"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5">Total : ₱{item.productInfo?.sellingprice * item.quantity}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center border-solid border-t-4">
                            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">Status : {getStatus(receiptNumber)}</h2>
                            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">Date & Time Added : {getDateTimeAdded(receiptNumber)}</h2>
                            <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-5 border-x-4 border-solid px-4">Overall Total : ₱{calculateReceiptTotal(receiptItems)}</h2>
                        </div>
                    </div>
                    )}
                )}
            </div>
        </div>
        </>
    );
};

export default Pending;
