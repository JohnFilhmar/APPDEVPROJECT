import axios from 'axios';
import { useState } from 'react';

const useGetMessages = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('getChats');
            setResponse(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, response, loading, error };
};
 
export default useGetMessages;