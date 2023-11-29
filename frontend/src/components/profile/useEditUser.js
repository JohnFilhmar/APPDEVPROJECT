import axios from "axios";
import { useState } from "react";

const useEditUser = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const submitEdit = async (formData) => {
        try {
            const response = await axios.put(`Users/${sessionStorage.getItem('userId')}`, formData);
            return response.data;
        } catch (error) {
            console.error("Error editing user:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, submitEdit };
};

export default useEditUser;
