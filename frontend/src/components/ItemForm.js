import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import useCacheOptions from "../hooks/useCacheOptions";
import useAddProduct from "../hooks/useAddProduct";
import Loading from "./Loading";
import PromptError from './PromptError';

const ItemForm = () => {
    const [ItemName, setItemName] = useState("");
    const [PartNumber, setPartNumber] = useState("");
    const [MarketPrice, setMarketPrice] = useState("");
    const [BoughtPrice, setBoughtPrice] = useState("");
    const [SellingPrice, setSellingPrice] = useState("");
    const [InitialQuantity, setInitialQuantity] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const { error, loading, postRequest } = useAddProduct('Products');

    // supplier input
    const {
      options: supplierOptions,
      isInputFocused: isSupplierInputFocused,
      suggestion: supplierSuggestion,
      handleInputChange: handleInputChangeSupplier,
      handleSuggestionClick: handleSuggestionClickSupplier,
      handleInputFocus: handleInputFocusSupplier,
      handleInputBlur: handleInputBlurSupplier,
    } = useCacheOptions("supplierSuggestions");
    // category input
    const {
      options: categoryOptions,
      isInputFocused: isCategoryInputFocused,
      suggestion: categorySuggestion,
      handleInputChange: handleInputChangeCategory,
      handleSuggestionClick: handleSuggestionClickCategory,
      handleInputFocus: handleInputFocusCategory,
      handleInputBlur: handleInputBlurCategory,
    } = useCacheOptions("categorySuggestion");
    // compatibility input
    const {
        options: compatibilityOptions,
        isInputFocused: isCompatibilityInputFocused,
        suggestion: compatibilitySuggestion,
        handleInputChange: handleInputChangeCompatibility,
        handleSuggestionClick: handleSuggestionClickCompatibility,
        handleInputFocus: handleInputFocusCompatibility,
        handleInputBlur: handleInputBlurCompatibility,
    } = useCacheOptions("compatibilitySuggestion");
    // branch input
    const {
      options: branchOptions,
      isInputFocused: isBranchInputFocused,
      suggestion: BranchSuggestion,
      handleInputChange: handleInputChangeBranch,
      handleSuggestionClick: handleSuggestionClickBranch,
      handleInputFocus: handleInputFocusBranch,
      handleInputBlur: handleInputBlurBranch,
    } = useCacheOptions("BranchSuggestion");

    function getCurrentDateFormatted() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
    
        return formattedDate;
    }
    
    const parseMarketPrice = (e) => {
        const val = Math.min(99999, parseFloat(e.target.value.replace(/[^\d.]/g, '').slice(0, 9)) || 1);
        setMarketPrice(val);
    };
    
    const parseBoughtPrice = (e) => {
        const val = Math.min(99999, parseFloat(e.target.value.replace(/[^\d.]/g, '').slice(0, 9)) || 1);
        setBoughtPrice(val);
    };
    
    const parseSellingPrice = (e) => {
        const val = Math.min(99999, parseFloat(e.target.value.replace(/[^\d.]/g, '').slice(0, 9)) || 1);
        setSellingPrice(val);
    };
    
    const parsePartNum = (e) => {
        const partval = Math.min(99999, parseInt(e.target.value.replace(/\D/g, '').slice(0, 5), 10) || 1);
        setPartNumber(partval);
    };
    
    const parseQuantity = (e) => {
        const quantityValue = Math.min(999, parseInt(e.target.value.replace(/\D/g, '').slice(0, 3), 10) || 1);
        setInitialQuantity(quantityValue);
    };

    const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    };
    
    const SubmitForm = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        
        const formData = new FormData();
        formData.append('itemname', ItemName);
        formData.append('image', selectedFile); // Use the same field name expected by the backend
        formData.append('category', categoryOptions);
        formData.append('partnumber', PartNumber);
        formData.append('compatibility', compatibilityOptions);
        formData.append('marketprice', MarketPrice);
        formData.append('boughtprice', BoughtPrice);
        formData.append('sellingprice', SellingPrice);
        formData.append('initialquantity', InitialQuantity);
        formData.append('branch', branchOptions);
        formData.append('lastdateupdated', getCurrentDateFormatted());
        formData.append('supplier', supplierOptions);

        try {
            const response = await postRequest(formData);

            if (loading) {
              return <Loading />;
            }
        
            if (error) {
              return (
                <PromptError message={error}/>
              );
            }
        
            if (response && response.messages && response.messages.success) {
                sessionStorage.setItem('uploadSuccess', response.messages.success);
            }
            
            if(response && response.redirect){
                window.location.href = response.redirect;
            }
            
            localStorage.setItem("supplierSuggestions", JSON.stringify(supplierSuggestion));
            localStorage.setItem("categorySuggestion", JSON.stringify(categorySuggestion));
            localStorage.setItem("compatibilityOptions", JSON.stringify(compatibilityOptions));
            localStorage.setItem("branchOptions", JSON.stringify(branchOptions));
        } catch(error) {
            <PromptError message={error}/>
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 mb-4">
                <div className="col-span-1 bg-gray-200 p-4 relative">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white inline-block">Add New Item</h2>
                </div>
            </div>
            <div className="mb-10">
                <form method="post" onSubmit={SubmitForm}className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="itemname">
                        <Label htmlFor="itemname">Item Name:</Label>
                        <TextInput
                            type="text"
                            id="itemname"
                            placeholder="Enter new item's name. . . "
                            value={ ItemName }
                            onChange={ (e) => setItemName(e.target.value) }
                            required
                        />
                    </div>
                    <div className="partnumber">
                        <Label htmlFor="partnumber">Item Partnumber:</Label>
                        <TextInput
                            type="number"
                            id="partnumber"
                            placeholder="Unique item's part number. . . "
                            value={ PartNumber }
                            onChange={ parsePartNum }
                            required
                        />
                    </div>
                    <div className="image">
                        <div id="fileUpload">
                        <div className="block">
                            <Label htmlFor="file" value="Upload an image" />
                        </div>
                            <FileInput 
                                id="file" 
                                helperText="Upload an image of the item. (Optional)" 
                                accept="image/*"
                                multiple={false}
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="compatibility">
                        <Label htmlFor="compatibility">Model Compatibility:</Label>
                        <TextInput
                            type="text"
                            id="compatibility"
                            placeholder="Enter new item's name. . . "
                            value={compatibilityOptions}
                            onChange={handleInputChangeCompatibility}
                            onFocus={handleInputFocusCompatibility}
                            onBlur={handleInputBlurCompatibility}
                            required
                        />
                        {isCompatibilityInputFocused && compatibilitySuggestion.length > 0 && (
                        <ul className="mt-1 border rounded bg-white absolute z-50">
                            {compatibilitySuggestion.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                handleSuggestionClickCompatibility(suggestion);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="category">
                        <Label htmlFor="category">Category:</Label>
                        <TextInput
                        id="category"
                        type="text"
                        value={categoryOptions}
                        onChange={handleInputChangeCategory}
                        onFocus={handleInputFocusCategory}
                        onBlur={handleInputBlurCategory}
                        placeholder="Item's Category..."
                        required
                        />
                        {isCategoryInputFocused && categorySuggestion.length > 0 && (
                        <ul className="mt-1 border rounded bg-white absolute z-50">
                            {categorySuggestion.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                handleSuggestionClickCategory(suggestion);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="initialquantity">
                        <Label htmlFor="initialquantity">Quantity To Add:</Label>
                        <TextInput
                            type="number"
                            id="initialquantity"
                            placeholder="Number of items to add. . . "
                            value={ InitialQuantity }
                            onChange={ parseQuantity }
                            required
                        />
                    </div>
                    <div className="marketprice">
                        <Label htmlFor="marketprice">Market Price:</Label>
                        <TextInput
                            type="number"
                            id="marketprice"
                            placeholder="Price on the market of an item. . . "
                            value={ MarketPrice }
                            onChange={ parseMarketPrice }
                            required
                        />
                    </div>
                    <div className="boughtprice">
                        <Label htmlFor="boughtprice">Bought Price:</Label>
                        <TextInput
                            type="number"
                            id="boughtprice"
                            placeholder="Expended cost for an item. . . "
                            value={ BoughtPrice }
                            onChange={ parseBoughtPrice }
                            required
                        />
                    </div>
                    <div className="sellingprice">
                        <Label htmlFor="sellingprice">Selling Price:</Label>
                        <TextInput
                            type="number"
                            id="sellingprice"
                            placeholder="Cost to sell per item. . . "
                            value={ SellingPrice }
                            onChange={ parseSellingPrice }
                            required
                        />
                    </div>
                    <div className="supplier">
                        <Label htmlFor="supplier">Supplier:</Label>
                        <TextInput
                        id="supplier"
                        type="text"
                        value={supplierOptions}
                        onChange={handleInputChangeSupplier}
                        onFocus={handleInputFocusSupplier}
                        onBlur={handleInputBlurSupplier}
                        placeholder="Item's supplier..."
                        required
                        />
                        {isSupplierInputFocused && supplierSuggestion.length > 0 && (
                        <ul className="mt-1 border rounded bg-white absolute z-50">
                            {supplierSuggestion.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                handleSuggestionClickSupplier(suggestion);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="branch">
                        <Label htmlFor="branch">Branch:</Label>
                        <TextInput
                        id="branch"
                        type="text"
                        value={branchOptions}
                        onChange={handleInputChangeBranch}
                        onFocus={handleInputFocusBranch}
                        onBlur={handleInputBlurBranch}
                        placeholder="Item's branch..."
                        required
                        />
                        {isBranchInputFocused && BranchSuggestion.length > 0 && (
                        <ul className="mt-1 border rounded bg-white absolute z-50">
                            {BranchSuggestion.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    handleSuggestionClickBranch(suggestion);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="submitbutton flex justify-end lg:items-center mt-5">
                        <Button type="submit" size="xl" style={{ width: '30vw' }}>Add Item</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ItemForm;