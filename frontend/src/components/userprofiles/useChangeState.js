import axios from "axios";
import { useState } from "react";

const useChangeState = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeState = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(`changeState/${id}`);
      return (response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, changeState };
}
 
export default useChangeState;