import { Avatar, Button, FileInput, Label, TextInput } from "flowbite-react";

const EditAccount = () => {
    return (
        <>
            <div className="p-4">
                <div className="py-5 border-b border-gray-500 border-t-1 border-r-1 border-l-1 border-gray-200">
                    <h3 className="text-xl font-bold text-slate-700">My Profile</h3>
                    <p className="text-slate-500 text-base">Manage your account</p>
                </div>
                <div className="pt-5 flex">
                    <div className="basis-7/12">
                        <form className="flex flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                <Label htmlFor="username" value="Your username" />
                                </div>
                                <TextInput id="username" type="text" placeholder="gamer123" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                <Label htmlFor="email2" value="Your email" />
                                </div>
                                <TextInput id="email2" type="email" placeholder="name@gmail.com" required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                <Label htmlFor="address" value="Enter address" />
                                </div>
                                <TextInput id="address" type="text" placeholder="Canubing 1 Proper, Calapan City" required shadow />
                            </div>
                            <Button type="submit">Save</Button>
                        </form>
                    </div>
                    <div className="basis-5/12 flex justify-center text-center">
                        <div className="flex flex-col">
                            <Avatar img={'http://localhost:8080/uploads/pogi.jpg'} size="lg" rounded/>
                            <Label htmlFor="file" className="mt-2">Upload a new image</Label>
                            <FileInput id="file"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default EditAccount;