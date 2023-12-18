import { useEffect, useState } from 'react';
import { Spinner, Table, Pagination, Button, Alert, Dropdown, Modal, TextInput, Label } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { CSVLink } from 'react-csv';
import { HiInformationCircle } from 'react-icons/hi';
import axios from 'axios';
import { TbExposureMinus1, TbExposurePlus1 } from "react-icons/tb";

const ITEMS_PER_PAGE = 10;

const DashTable = () => {
    const [itemname, setitemname] = useState(null);
    const [category, setcategory] = useState(null);
    const [compatibility, setcompatibility] = useState(null);
    const [marketprice, setmarketprice] = useState(null);
    const [boughtprice, setboughtprice] = useState(null);
    const [sellingprice, setsellingprice] = useState(null);
    const [currentquantity, setcurrentquantity] = useState(null);
    const [maxQuantity, setMaxQuantity] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantityChange, setQuantityChange] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBranchData, setFilteredBranchData] = useState([...products]);
    const [openModal, setOpenModal] = useState(false);
    const [toEdit, setToEdit] = useState(0);

    const pageCount = Math.ceil(filteredBranchData.length / ITEMS_PER_PAGE);
    const fetchData = async () => {
      try {
        const response = await axios.get('getProducts');
        setProducts(response.data);
        setFilteredBranchData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const addQuantity = async (id) => {
        try{
            await axios.postForm(`addQuantity/${id}`);
            setQuantityChange((prev) => prev + 1)
        } catch(error) {
            console.log(error);
        }
    }

    const decreaseQuantity = async (id) => {
        try{
            await axios.postForm(`decreaseQuantity/${id}`);
            setQuantityChange((prev) => prev - 1)
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantityChange]);

    useEffect(() => {
        console.log(toEdit);
        fetchData();
        if(toEdit){
            const formEditProduct = products.find((prod) => parseInt(prod.id) === toEdit);
            setitemname(formEditProduct?.itemname || '');
            setcategory(formEditProduct?.category || '');
            setcompatibility(formEditProduct?.compatibility || '');
            setmarketprice(formEditProduct?.marketprice || null);
            setboughtprice(formEditProduct?.boughtprice || null);
            setsellingprice(formEditProduct?.sellingprice || null);
            setcurrentquantity(formEditProduct?.currentquantity || null);
            setMaxQuantity(formEditProduct?.initialquantity || null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[openModal]);
    
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
            const response = await axios.get('getProducts');
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

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('itemname', itemname);
            formData.append('category', category);
            formData.append('compatibility', compatibility);
            formData.append('marketprice', marketprice);
            formData.append('boughtprice', boughtprice);
            formData.append('sellingprice', sellingprice);
            formData.append('currentquantity', currentquantity);
            const response = await axios.postForm(`updateProduct/${toEdit}`,formData);
            console.log(response);
            setOpenModal(false);
        } catch(error) {
            console.log(error.message);
            setOpenModal(false);
        }
    };

    return (
        <>
            <br/><br/>
            {/* Table */}
            <div className="relative sm:text-sm md:text-base lg:text-lg">
                <div className="static overflow-x-auto">
                    <Table className="min-w-full min-h-[645px] max-h-[645px]">
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
                                className={`divide-x ${ 
                                    product.currentquantity / product.initialquantity >= 0 &&
                                    product.currentquantity / product.initialquantity <= 0.10
                                        ? "bg-red-200"
                                        : product.currentquantity / product.initialquantity > 0.10 &&
                                        product.currentquantity / product.initialquantity <= 0.50
                                        ? "bg-orange-200"
                                        : product.currentquantity / product.initialquantity > 0.50 &&
                                        product.currentquantity / product.initialquantity <= 0.80
                                        ? "bg-green-200"
                                        : product.currentquantity / product.initialquantity > 0.80 &&
                                        product.currentquantity / product.initialquantity <= 1.0
                                        ? "bg-blue-200"
                                        :
                                        "bg-white"
                                }`}
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
                                <Table.Cell className='flex items-center justify-center gap-3'>
                                    <button onClick={() => addQuantity(product.id)}><TbExposurePlus1/></button>
                                        {product.currentquantity}{product.currentquantity > 1 ? "pcs" : "pc"}
                                    <button onClick={() => decreaseQuantity(product.id)}><TbExposureMinus1/></button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() => {setToEdit(parseInt(product.id)); setOpenModal(true);}}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                    >
                                    Edit
                                    </button>
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
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <form onSubmit={submitEdit}>
                    <Modal.Header>Edit Item</Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="itemname" value="Item Name" />
                            </div>
                            <TextInput
                                type='text'
                                id='itemname'
                                value={itemname}
                                onChange={(e) => setitemname(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Item Category" />
                            </div>
                            <TextInput
                                type='text'
                                id='category'
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="compatibility" value="Item Compatibility" />
                            </div>
                            <TextInput
                                type='text'
                                id='compatibility'
                                value={compatibility}
                                onChange={(e) => setcompatibility(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="marketprice" value="Item Marketprice" />
                            </div>
                            <TextInput
                                type='number'
                                step="0.01"
                                id='marketprice'
                                value={marketprice}
                                onChange={(e) => setmarketprice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="boughtprice" value="Item Boughtprice" />
                            </div>
                            <TextInput
                                type='number'
                                step="0.01"
                                id='boughtprice'
                                value={boughtprice}
                                onChange={(e) => setboughtprice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="sellingprice" value="Item Sellingprice" />
                            </div>
                            <TextInput
                                type='number'
                                step="0.01"
                                id='sellingprice'
                                value={sellingprice}
                                onChange={(e) => setsellingprice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="mb-2 block">
                                <Label htmlFor="currentquantity" value="Item Currentquantity" />
                            </div>
                            <TextInput
                                type='number'
                                id='currentquantity'
                                min={0}
                                max={maxQuantity}
                                value={currentquantity}
                                onChange={(e) => setcurrentquantity(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type='submit'>Submit Edit</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default DashTable;
