import { useEffect, useState } from 'react';
import { Spinner, Table, Pagination, Button, Alert, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useProducts from '../hooks/useProducts';
import { CSVLink } from 'react-csv';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

const DashTable = () => {
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBranchData, setFilteredBranchData] = useState([...products]);

    const pageCount = Math.ceil(filteredBranchData.length / ITEMS_PER_PAGE);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setFilteredBranchData([...products]);
    },[products])
    
    const search = (query) => {
            const results = products.filter((product) =>
            product.itemname.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.compatibility.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBranchData(results);
    };

    const handleBranchButtonClick = async (branch) => {
        if (branch === 'All Branch') {
            setFilteredBranchData([...products]);
        } else {
            const response = await axios.get('Products');
            const branchResults = response.data.filter((product) => 
            product.branch.toLowerCase().includes(branch.toLowerCase()));
            setFilteredBranchData(branchResults);
        }
    };

    // Slice the products array to display only the current page's worth of items
    const displayedProducts = filteredBranchData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <br/><br/>
            {/* Table */}
            <div className="relative sm:text-sm md:text-base lg:text-lg">
                <div className="static overflow-x-auto">
                    <Table striped className="min-w-full min-h-[645px] max-h-[645px]">
                        <Table.Head>
                            <Table.HeadCell>Item Name</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Branch</Table.HeadCell>
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
                            <td colSpan="10" className="text-center py-4">
                            <Spinner aria-label="Default status example" />
                            </td>
                        </tr>
                        ) : error ? (
                        <tr>
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Error ! </span>Something have gone wrong.
                            </Alert>
                        </tr>
                        ) : (
                        displayedProducts.map((product) => (
                            <Table.Row
                                key={product.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 divide-x font-semibold"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.itemname}
                                </Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.branch}</Table.Cell>
                                <Table.Cell>₱{product.marketprice}</Table.Cell>
                                <Table.Cell>₱{product.boughtprice}</Table.Cell>
                                <Table.Cell>₱{product.sellingprice}</Table.Cell>
                                <Table.Cell>{product.initialquantity}{product.initialquantity > 1 ? "pcs" : "pc"}</Table.Cell>
                                <Table.Cell className={`${
                                    product.currentquantity / product.initialquantity >= 0 &&
                                    product.currentquantity / product.initialquantity <= 0.10
                                        ? "text-red-600"
                                        : product.currentquantity / product.initialquantity > 0.10 &&
                                        product.currentquantity / product.initialquantity <= 0.50
                                        ? "text-orange-600"
                                        : product.currentquantity / product.initialquantity > 0.50 &&
                                        product.currentquantity / product.initialquantity <= 0.80
                                        ? "text-green-600"
                                        : product.currentquantity / product.initialquantity > 0.80 &&
                                        product.currentquantity / product.initialquantity <= 1.0
                                        ? "text-blue-800"
                                        : // default styles if none of the conditions are met
                                        ""
                                }`}>{product.currentquantity}{product.currentquantity > 1 ? "pcs" : "pc"}</Table.Cell>
                                <Table.Cell>
                                    <Link
                                        to={`/itemform/${product.id}`}
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
                        className="border rounded p-2 w-20"
                        placeholder="Search..."
                        onChange={(e) => search(e.target.value)}
                    />
                </div>
                <div className="absolute top-[-50px] left-0">
                    <Dropdown label="Branches" dismissOnClick={false}>
                        <Dropdown.Item className='justify-center' onClick={() => handleBranchButtonClick('All Branch')}>All Branch</Dropdown.Item><Dropdown.Divider />
                        <Dropdown.Item className='justify-center' onClick={() => handleBranchButtonClick('Canubing I')}>Canubing I</Dropdown.Item><Dropdown.Divider />
                        <Dropdown.Item className='justify-center' onClick={() => handleBranchButtonClick('Canubing I.2')}>Canubing I.2</Dropdown.Item><Dropdown.Divider />
                        <Dropdown.Item className='justify-center' onClick={() => handleBranchButtonClick('Bayanan II')}>Bayanan II</Dropdown.Item><Dropdown.Divider />
                        <Dropdown.Item className='justify-center' onClick={() => handleBranchButtonClick('Malinao')}>Malinao</Dropdown.Item><Dropdown.Divider />
                    </Dropdown>
                </div>
                <div className="flex justify-between mt-5">
                    {/* CSV Link - Bottom Left */}
                    <div>
                        <Button className='mt-5'>
                            <CSVLink
                                data={filteredBranchData.map(product => Object.values(product))}
                                headers={['id', 'itemname', 'image', 'category', 'compatibility', 'marketprice', 'boughtprice', 'sellingprice', 'initialquantity', 'currentquantity', 'branch', 'lastdateupdated', 'supplier']}
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
