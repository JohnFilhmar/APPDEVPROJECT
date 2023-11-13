import React from "react";
import useProducts from "../hooks/useProducts";

const Table = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error.message}</p>;
    }

    return (
        <div>
            {products.map((product) => (
                <div>{product.itemname}{product.id}</div>
            ))}
        </div>
    );
}
 
export default Table;