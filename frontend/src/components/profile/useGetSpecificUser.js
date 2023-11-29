import axios from 'axios';
import { useState } from 'react';

const useGetUsers = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get(`Users/${sessionStorage.getItem('userId')}`);
            setResponse(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return { response, loading, error, fetchData };
};
 
export default useGetUsers;