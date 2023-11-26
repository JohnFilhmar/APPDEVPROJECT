import { TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CiSearch } from "react-icons/ci";

const Purchases = () => {
    const [query,setQuery] = useState("");

    const someaction = () => {
        console.log("Clicked");
    };

    return (
        <>
            <div className="ml-5 flex flex-col hidden md:block lg:block">
                <div className="flex gap-4 text-center text-xl font-light mb-5 bg-slate-50 border-b border-gray-500 border-t-1 border-r-1 border-l-1 border-gray-200 py-3">
                    <Link to="#" className="basis-5/12 hover:font-normal active:font-medium" onClick={someaction}>All</Link>
                    <Link to="#" className="basis-5/12 hover:font-normal active:font-medium" onClick={someaction}>Pending</Link>
                    <Link to="#" className="basis-5/12 hover:font-normal active:font-medium" onClick={someaction}>Returns</Link>
                    <Link to="#" className="basis-5/12 hover:font-normal active:font-medium" onClick={someaction}>To Pick Up</Link>
                </div>
                <div className="w-full mb-3">
                    <div className="relative">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <TextInput
                            type="text"
                            id="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="You can search by item name, branch, order ID, or category"
                            autoComplete={query}
                            className="pl-10" // Adjust padding-left based on the icon size
                        />
                    </div>
                </div>
                <div className="container bg-slate-50">
                    <div className="h-auto flex flex-col">
                        <div className="grid grid-cols-4 h-full text-center p-4">
                            <div className="col-span-1 flex items-center justify-center">
                            <img src="http://localhost:8080/uploads/ampel.jpg" alt="asdf" className="object-cover w-20 h-20 rounded-full" />
                            </div>
                            <div className="col-span-3 flex flex-col justify-between">
                            <div>
                                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Oil Filter
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                Compatibility: Barako
                                </p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                ₱15.00
                                </div>
                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Quantity: 1pc
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 h-full text-center p-4">
                            <div className="col-span-1 flex items-center justify-center">
                            <img src="http://localhost:8080/uploads/ampel.jpg" alt="asdf" className="object-cover w-20 h-20 rounded-full" />
                            </div>
                            <div className="col-span-3 flex flex-col justify-between">
                            <div>
                                <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Oil Filter
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                Compatibility: Barako
                                </p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                ₱15.00
                                </div>
                                <div className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                Quantity: 1pc
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Purchases;