import { FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const ItemForm = () => {
    const [ItemName,setItemName] = useState("");
    const [Quantity,setQuantity] = useState("");

    return (
        <>
            <div className="container mx-auto">
                <form action="/Products" method="post" className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
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
                </form>
            </div>
        </>
    );
}
 
export default ItemForm;
