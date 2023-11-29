import axios from "axios";
import { useState } from "react";

const useAddCheckOut = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postRequest = async (postData) => {
    try {
      setLoading(true);
      const response = await axios.postForm('Checkout', postData);
      return (response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, postRequest };
}

export default useAddCheckOut;