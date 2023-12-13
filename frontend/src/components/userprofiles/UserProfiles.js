import React, { useEffect, useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { IoTrashOutline, IoPencilOutline } from 'react-icons/io5';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import ChangeState from './useChangeState';
import PopupMessage from '../PopupMessage';
import axios from 'axios';

const UserProfiles = () => {
    const { error, loading, changeState:cState } = ChangeState();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);

    const getusers = async () => {
        const response = await axios.get('getUsers');
        setUsers(response.data.filter( users => users.userRole.includes('USER') || users.userRole.includes('CASHIER')));
    }

    useEffect(() => {
        getusers();
        setMessage(response?.message || "");
    }, [response,message]);
    
    const changeState = async (userId) => {
        try {
            const result = await cState(userId);
            setResponse(result);
            console.log(result.message);
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleDeleteUser = async (userId) => {
        try {
            const result = await axios.post(`deleteUser/${userId}`);
            setResponse(result);
            console.log(result.message);
        } catch (err) {
            console.error(err);
        }
    };

    function formatDateTime(inputDateTime) {
        if (!inputDateTime || typeof inputDateTime !== 'string') {
            return 'Invalid date';
        }
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const inputDate = new Date(inputDateTime);
        if (isNaN(inputDate.getTime())) {
            return 'No Activity';
        }
        const formattedDateTime = inputDate.toLocaleString('en-US', options);
        return formattedDateTime;
    }

    return (
        <div className="overflow-auto mt-2">
            <div className="grid grid-cols-1 mb-4 mt-5">
                <div className="col-span-1 bg-gray-200 p-4 relative">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white inline-block">User Management</h2>
                </div>
            </div>
            <Table>
                <Table.Head className='bg-gray-100'>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>User ID</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Created at</Table.HeadCell>
                    <Table.HeadCell>Last Date Updated</Table.HeadCell>
                    <Table.HeadCell>Last Activity</Table.HeadCell>
                    <Table.HeadCell>State</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y'>
                {users.map((user,index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{user.userImage? <img src={`http://localhost:8080/uploads/users/${user.userImage}`}  alt="Not Found"></img> : "No Picture To Show"}</Table.Cell>
                        <Table.Cell>{user.userId}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.userName}</Table.Cell>
                        <Table.Cell>{user.userEmail}</Table.Cell>
                        <Table.Cell>{user.userAddress}</Table.Cell>
                        <Table.Cell>{user.userRole}</Table.Cell>
                        <Table.Cell>{formatDateTime(user.datetime_added)}</Table.Cell>
                        <Table.Cell>{formatDateTime(user.date_updated)}</Table.Cell>
                        <Table.Cell>{formatDateTime(user.last_activity)}</Table.Cell>
                        <Table.Cell className='hover:text-blue-600 hover:cursor-pointer' onClick={() => changeState(user.userId)}> 
                            {(user.state === '1') ? 
                                <MdKeyboardArrowUp  className='w-8 h-8' /> : 
                                <MdKeyboardArrowDown  className='w-8 h-8' />
                            }
                        </Table.Cell>
                        <Table.Cell className='flex flex-row gap-4'>
                            <Button variant="danger" onClick={() => handleDeleteUser(user.userId)}>
                            <IoTrashOutline />
                            </Button>
                            <Button variant="info" onClick={() => console.log('clkicksadf')}>
                            <IoPencilOutline />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
            { message && <PopupMessage type="success" message={message}/> }
        </div>
    );
};

export default UserProfiles;
