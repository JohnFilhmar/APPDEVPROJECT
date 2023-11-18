import { useState } from 'react';
import axios from 'axios';

const useAddProduct = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postRequest = async (postData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, postData);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postRequest };
};

export default useAddProduct;