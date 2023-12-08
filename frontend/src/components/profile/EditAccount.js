import { Avatar, Button, FileInput, Label, TextInput, Spinner } from "flowbite-react";
import useGetUsers from './useGetSpecificUser';
import useEditUser from "./useEditUser";
import { useEffect, useState } from "react";

const EditAccount = () => {
    // eslint-disable-next-line
    const { loading: loadingEdit, error: errorEdit, submitEdit } = useEditUser();
    // eslint-disable-next-line
    const { response: usersResponse, error: userError, loading: userLoading, fetchData } = useGetUsers();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        if (usersResponse) {
            setUserName(usersResponse.userName ?? "");
            setUserEmail(usersResponse.userEmail ?? "");
            setUserAddress(usersResponse.userAddress ?? "");
            setUserImage(usersResponse.userImage ?? "");
        }
    }, [usersResponse]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('userEmail', userEmail);
        formData.append('userAddress', userAddress);
    
        try {
            const response = await submitEdit(formData);
            if (response.data && response.data.userName) {
                localStorage.setItem('userName', response.data.userName);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="p-4">
                <div className="py-5 border-b border-gray-500 border-t-1 border-r-1 border-l-1">
                    <h3 className="text-xl font-bold text-slate-700">My Profile</h3>
                    <p className="text-slate-500 text-base">Manage your account</p>
                </div>
                <div className="pt-5 flex">
                    <div className="basis-7/12">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit} enctype="multipart/form-data" >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="username" value="Your username" />
                                </div>
                                <TextInput autoComplete="true" value={userName} onChange={(e) => setUserName(e.target.value)} id="username" name="username" type="text" placeholder="gamer123" shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput autoComplete="true" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} id="email" name="email" type="email" placeholder="name@gmail.com" shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="address" value="Enter address" />
                                </div>
                                <TextInput autoComplete="true" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} id="address" name="address" type="text" placeholder="Canubing 1 Proper, Calapan City" shadow />
                            </div>
                            <Button type="submit">Save</Button>
                        </form>
                    </div>
                    <div className="basis-5/12 flex justify-center text-center">
                        <div className="flex flex-col">
                            {userLoading ? (
                                <Spinner size="lg" />
                            ) : (
                                <Avatar img={userImage ? `http://localhost:8080/uploads/${userImage}` : `http://localhost:8080/uploads/profile.png`} size="lg" rounded />
                            )}
                            <Label htmlFor="file" className="mt-2">
                                Upload a new image
                            </Label>
                            <FileInput id="file" name="file" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditAccount;
