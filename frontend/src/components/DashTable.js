import { useState } from 'react';
import { Spinner, Table, Pagination, Button } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useProducts from '../hooks/useProducts';
import { CSVLink } from 'react-csv';

const ITEMS_PER_PAGE = 10;

const DashTable = () => {
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

    // Slice the products array to display only the current page's worth of items
    const displayedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* Header */}
            <div className="grid grid-cols-1 mb-4">
                <div className="col-span-1 bg-gray-200 p-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Inventory</h2>
                {/* <h1>{products.length}</h1> */}
                </div>
            </div>
            {/* Table */}
                <div className="relative">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>Product name</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Part Number</Table.HeadCell>
                            <Table.HeadCell>Market Price</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                            <Spinner aria-label="Default status example" />
                            </td>
                        </tr>
                        ) : error ? (
                        <tr>
                            <td colSpan="5">Error: {error.message}</td>
                        </tr>
                        ) : (
                        displayedProducts.map((product) => (
                            <Table.Row
                                key={product.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.itemname}
                                </Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.partnumber}</Table.Cell>
                                <Table.Cell>{product.marketprice}</Table.Cell>
                                <Table.Cell>
                                    <Link
                                    to={`/edit/${product.id}`}
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                    >
                                    Edit
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))
                        )}
                    </Table.Body>
                    </Table>

                    <div className="flex justify-between mt-5">
                        {/* CSV Link - Bottom Left */}
                        <div>
                            <Button>
                                <CSVLink
                                    data={displayedProducts.map(product => Object.values(product))}
                                    headers={['id', 'itemname', 'category', 'partnumber', 'compatibility', 'marketprice', 'boughtprice', 'sellingprice', 'initialquantity', 'currentquantity', 'branch', 'lastdateupdated', 'supplier']}
                                    filename={'inventory.csv'}
                                >
                                    Download CSV
                                </CSVLink>
                            </Button>
                        </div>
                        <div/>
                        {/* Pagination - Bottom Right */}
                        <div>
                            <Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={onPageChange} />
                        </div>
                    </div>
                </div>
        </>
    );
};

export default DashTable;
