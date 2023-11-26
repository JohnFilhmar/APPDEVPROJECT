import { useState } from "react";
import axios from 'axios';

const useChats = (sender, receiver, message) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addMessage = async () => {
    try {
      const response = await axios.postForm('Chats', {
        sender,
        receiver,
        message,
      });

      setResponse(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { addMessage, response, loading, error };
};

export default useChats;
