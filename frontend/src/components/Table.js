import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import useProducts from "../hooks/useProducts";

const Table = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error.message}</p>;
    }

    const columns = [
        { dataField: 'id', text: 'Product ID' },
        { dataField: 'itemname', text: 'Item Name' },
        { dataField: 'category', text: 'Category' },
        { dataField: 'partnumber', text: 'Part Number' },
        { dataField: 'compatibility', text: 'Compatibility' },
        { dataField: 'marketprice', text: 'Market Price' },
        { dataField: 'boughtprice', text: 'Bought Price' },
        { dataField: 'sellingprice', text: 'Selling Price' },
        { dataField: 'initialquantity', text: 'Initial Quantity' },
        { dataField: 'currentquantity', text: 'Current Quantity' },
        { dataField: 'branch', text: 'Branch' },
        { dataField: 'lastdateupdated', text: 'Last Date Updated' },
        { dataField: 'supplier', text: 'Supplier' },
    ];

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={products}
                columns={columns}
            />
        </div>
    );
}

export default Table;
