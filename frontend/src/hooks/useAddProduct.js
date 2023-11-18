import { useState } from 'react';
import axios from 'axios';

const useAddProduct = (url) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postRequest = async (postData) => {
    try {
      setLoading(true);
      const response = await axios.postForm(url, postData);
      return (response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, postRequest };
};

export default useAddProduct;