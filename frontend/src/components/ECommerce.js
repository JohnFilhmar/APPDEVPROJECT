import React from 'react';
import { Card, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useProducts from '../hooks/useProducts';

// const getRandomSpan = () => Math.floor(Math.random() * 3) + 1;
// const getRandomCols = () => Math.floor(Math.random() * 2) + 1;
// const getRandomRows = () => Math.floor(Math.random() * 3) + 1;

const generateRandomGrid = (products) => {
    return products.map((product, index) => {
        // const span = getRandomSpan();
        // const colSpan = getRandomCols();
        // const rowSpan = getRandomRows();

        return (
            <Card
                key={index} 
                className={`mb-4`}
                imgAlt='NoImageToShow'
                imgSrc='logo512.png'
                // imgSrc={product.image}
            >
            <div className="flex justify-end pt-4">
              <Dropdown inline label="">
                <Dropdown.Item>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Export Data
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </Link>
                </Dropdown.Item>
              </Dropdown>
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.itemname}
            </h1>
            <p className='font-bold'>
                {product.compatibility} - {product.partnumber}
            </p>
            <p className='font-bold'>
                Branch: {product.branch}
            </p>
            {/* <img src="logo512.png" alt="NoImageToShow" className='w-16 sm:w-32 lg:w-48' style={{position:'static', left: '10px'}}/> */}
            {/* Add other card content based on your product data */}
            </Card>
        );
    });
};

const ProductGrid = () => {
    
    const { products, loading, error } = useProducts();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 ml-4 mr-4 mt-5">
            {generateRandomGrid(products)}
        </div>
    );
};

export default ProductGrid;
