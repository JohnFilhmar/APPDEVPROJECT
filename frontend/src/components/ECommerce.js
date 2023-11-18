import React from 'react';
import useProducts from '../hooks/useProducts';
import { Button, Card, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from './Loading';
import PromptError from './PromptError';

const gridItems = (products) => {
  
  const access = sessionStorage.getItem('accessibility');

  return products.map((product, index) => {
    return (
        <Card
            key={index} 
            className={`mb-4 text-sm lg:text-lg md:text-base`}
            imgAlt='NoImageToShow'
            imgSrc={product.image}
        >
        <div className="flex justify-end pt-4">
          {access === 'FULL' && (
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
          )}
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
        <Button color='success'>Add to card</Button>
        </Card>
      );
  });
};

const ProductGrid = () => {
    
    const { products, loading, error } = useProducts();

    if (loading) {
        return <Loading />;
    }
    
    if (error) {
        return <PromptError />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 ml-4 mr-4 mt-5 text-sm lg:text-lg md:text-base sm:text-sm">
            {gridItems(products)}
        </div>
    );
};

export default ProductGrid;
