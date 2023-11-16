import { useState } from 'react';
import { Spinner, Table, Pagination, Button } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useProducts from '../hooks/useProducts';
import { CSVLink } from 'react-csv';

const ITEMS_PER_PAGE = 10;

const DashTable = () => {
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [query,setQuery] = useState("");

    // Calculate the total number of pages
    const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Searching item name from the table
    function search(data) {
        return data.filter((item) => item.itemname.toLowerCase().includes(query));
    };

    // Slice the products array to display only the current page's worth of items
    const displayedProducts = search(products).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <br/><br/>
            {/* Table */}
            <div className="relative sm:text-sm md:text-base lg:text-lg">
                <div className="static overflow-x-auto">
                    <Table striped className="min-w-full">
                        <Table.Head>
                            <Table.HeadCell>Item Name</Table.HeadCell>
                            <Table.HeadCell>Part Number</Table.HeadCell>
                            <Table.HeadCell>Branch</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Market Price</Table.HeadCell>
                            <Table.HeadCell>Bought Price</Table.HeadCell>
                            <Table.HeadCell>Selling Price</Table.HeadCell>
                            <Table.HeadCell>Initial Quantity</Table.HeadCell>
                            <Table.HeadCell>Available</Table.HeadCell>
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
                                <Table.Cell>{product.partnumber}</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.branch}</Table.Cell>
                                <Table.Cell>₱{product.marketprice}</Table.Cell>
                                <Table.Cell>₱{product.boughtprice}</Table.Cell>
                                <Table.Cell>₱{product.sellingprice}</Table.Cell>
                                <Table.Cell>{product.initialquantity}pc/s</Table.Cell>
                                <Table.Cell>{product.currentquantity}pc/s</Table.Cell>
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
                </div>
                <div className="absolute top-[-50px] right-0 ">
                    <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mt-5">
                    {/* CSV Link - Bottom Left */}
                    <div>
                        <Button className='mt-5'>
                            <CSVLink
                                data={products.map(product => Object.values(product))}
                                headers={['id', 'itemname', 'image', 'category', 'partnumber', 'compatibility', 'marketprice', 'boughtprice', 'sellingprice', 'initialquantity', 'currentquantity', 'branch', 'lastdateupdated', 'supplier']}
                                filename={'inventory.csv'}
                            >
                                CSV
                            </CSVLink>
                        </Button>
                    </div>
                    <div/>
                    {/* Pagination - Bottom Right */}
                    <div className='flex'>
                        <div>
                            <Pagination layout="table" currentPage={currentPage} totalPages={pageCount} onPageChange={onPageChange} />
                        </div>
                        <div className='mt-7'>
                            <Button as={Link} to="/itemform">Add New Item</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashTable;
