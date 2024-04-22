import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setSortedProducts(data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
      } else {
        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
    });
    setSortedProducts(sorted);
  }, [products, sortBy, sortOrder]);

  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleChangeSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div>
        <div>
          Sort by:
          <select value={sortBy} onChange={handleChangeSortBy}>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
          <select value={sortOrder} onChange={handleChangeSortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="pagination top">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(sortedProducts.length / productsPerPage)}
          </span>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= sortedProducts.length}>
            Next
          </button>
        </div>
      </div>
      <div className="products-list">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination bottom">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(sortedProducts.length / productsPerPage)}
        </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= sortedProducts.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
