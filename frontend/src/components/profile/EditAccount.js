import { Avatar, Button, FileInput, Label, TextInput, Spinner } from "flowbite-react";
import useGetUsers from './useGetSpecificUser';
import useEditUser from "./useEditUser";
import { useEffect, useState } from "react";
import PopupMessage from "../PopupMessage";
import axios from "axios";

const EditAccount = () => {
    // eslint-disable-next-line
    const { loading: loadingEdit, error: errorEdit, submitEdit } = useEditUser();
    // eslint-disable-next-line
    const { response: usersResponse, error: userError, loading: userLoading, fetchData } = useGetUsers();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userImage, setUserImage] = useState("");
    const [smessage,setSMessage] = useState("");
    const [fmessage,setFMessage] = useState("");
    const [update, setUpdate] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
        setUpdate(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

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
                setSMessage('Account Updated!');
                setUpdate(true);
            }
        } catch (error) {
            setFMessage('Something may have gone wrong!');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userImage',selectedFile);

        try{
            const response = await axios.postForm(`uploadimage/${localStorage.getItem('userId')}`, formData)
            localStorage.setItem('userImage',response.data.userImage);
            console.log(response);
            setUpdate(true);
        } catch(error) {
            console.log(error);
        }
    }

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
                        <form className="flex flex-col" onSubmit={uploadImage} encType="multipart/form-data">
                            {userLoading ? (
                                <Spinner size="lg" />
                            ) : (
                                <Avatar img={userImage ? `http://localhost:8080/uploads/users/${userImage}` : `http://localhost:8080/uploads/users/profile.png`} size="lg" rounded />
                            )}
                            <Label htmlFor="file" className="mt-2">
                                Upload a new image
                            </Label>
                            <FileInput id="file" name="file" accept="image/*" required multiple={false} onChange={handleFileChange}/>
                            <Button type="submit">Upload</Button>
                        </form>
                    </div>
                    { smessage && <PopupMessage type="success" message={smessage}/> }
                    { fmessage && <PopupMessage type="fail" message={fmessage}/> }
                </div>
            </div>
        </>
    );
};

export default EditAccount;
