import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetUsers = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`Checkout/${sessionStorage.getItem('userId')}`);
                setResponse(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { response, loading, error };
};
 
export default useGetUsers;