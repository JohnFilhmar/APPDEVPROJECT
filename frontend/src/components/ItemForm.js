import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

const ItemForm = () => {
    const [ItemName, setItemName] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Category, setCategory] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
  
    useEffect(() => {
      const cachedSuggestions = localStorage.getItem("cachedSuggestions");
      if (cachedSuggestions) {
        setSuggestions(JSON.parse(cachedSuggestions));
      }
    }, []);
  
    const handleInputChange = (e) => {
      const userInput = e.target.value;
      setCategory(userInput);
  
      const mockSuggestions = ["Brakes", "Handlebars", "Seat", "Oil"];
      const filteredSuggestions = mockSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
  
      setSuggestions(filteredSuggestions);
    };
  
    const handleSuggestionClick = (suggestion) => {
      setCategory(suggestion);
      setSuggestions([]);
    };
  
    const handleInputFocus = () => {
      setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
        setTimeout(() => {
          setIsInputFocused(false);
        }, 300);
      };
  
    const SubmitForm = (e) => {
      e.preventDefault();


      localStorage.setItem("cachedSuggestions", JSON.stringify(suggestions));
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
                    <div className="itemname col-span-1 lg:col-span-2 mt-2">
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
                    <div className="image">
                        <div id="fileUpload">
                        <div className="mb-2 block">
                            <Label htmlFor="file" value="Upload an image" />
                        </div>
                            <FileInput id="file" helperText="Upload an image of the item. (Optional)" accept="image/*" multiple={false} />
                        </div>
                    </div>
                    <div className="quantity">
                        <Label htmlFor="quantity">Item Quantity:</Label>
                        <TextInput
                            type="number"
                            id="quantity"
                            placeholder="Number of items to add. . . "
                            value={ Quantity }
                            onChange={ (e) => setQuantity(e.target.value) }
                            required
                        />
                    </div>
                    <div className="category">
                        <Label htmlFor="category">Category:</Label>
                        <TextInput
                        id="category"
                        type="text"
                        value={Category}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Item's Category..."
                        />
                        {isInputFocused && suggestions.length > 0 && (
                        <ul className="mt-1 border rounded bg-white absolute">
                            {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    handleSuggestionClick(suggestion);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <div className="submitbutton">
                        <Button type="submit">Add Item</Button>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default ItemForm;
