import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import { Button, Card, Modal } from 'flowbite-react';
import Loading from './Loading';
import PromptError from './PromptError';
import axios from 'axios';

const gridItems = (products, click) => {
  return products.map((product, index) => {
    return product.currentquantity > 0 ? (
      <Card
        key={index}
        className={`mb-4 text-sm lg:text-lg md:text-base`}
        imgSrc={`http://localhost:8080/public/uploads/uploads/${product.image}`}
        imgAlt='NoImageToShow'
        onClick={() => click(product)}
      >
        <div className="flex justify-end pt-4">
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.compatibility} - {product.itemname} <br/>Available: {product.currentquantity} {product.currentquantity > 1 ? "pieces" : "piece left"}
        </h1>
      </Card>
    ) : null;
  });
};

const ProductGrid = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { products, loading, error } = useProducts();

  const search = async (query) => {
    try {
      const response = await axios.get('Products');
      const filteredResults = response.data.filter(product =>
        product.itemname.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.compatibility.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
      // Handle the error as needed
    }
  };

  const addToCart = () => {
    const existingItems = localStorage.getItem('cart');
    const cartItems = existingItems ? JSON.parse(existingItems) : [];
    const existingProductIndex = cartItems.findIndex(item => item.id === selectedProduct.id);
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ ...selectedProduct, quantity: 1 });
    }
    const updatedCart = JSON.stringify(cartItems);
    localStorage.setItem('cart', updatedCart);
    setOpenModal(false);
  };  

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <PromptError />;
  }

  return (
    <>
      <h1 className='text-center font-black text-lg md:text-xl lg:text-2xl'>Search</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 ml-4 mr-4 mt-5 text-sm lg:text-lg md:text-base sm:text-sm">
        <input
          type="text"
          className="border rounded p-2 col-span-2 md:col-span-3 lg:col-span-5 text-center"
          placeholder="Search for an item..."
          onChange={(e) => search(e.target.value)}
          name='search'
        />
        {gridItems(searchResults.length > 0 ? searchResults : products, (product) => {
          setSelectedProduct(product);
          setOpenModal(true);
        })}
      </div>
      <Modal size="lg" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedProduct && selectedProduct.category} - { selectedProduct && selectedProduct.itemname}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {selectedProduct && (
              <>
                <img src={`http://localhost:8080/public/uploads/uploads/${selectedProduct.image}`} alt="Selected Product" />
                <p className='text-base/6'>
                  Compatibility: {selectedProduct.compatibility}<br/>
                  Price: ₱{selectedProduct.sellingprice}<br/>
                  Branch: {selectedProduct.branch}
                </p>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-end'>
          <Button onClick={addToCart}>Add To Cart</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductGrid;
