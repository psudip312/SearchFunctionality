import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css'; // Import the CSS file for custom styling

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [baseurl, setBaseUrl] = useState('https://fakestoreapi.com/products');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseurl;
        const response = await axios.get(url);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery, selectedCategory]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setBaseUrl(category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products');
  };

 

  return (
    <div className="search-container">
      <div className="search-input">
        <input
          type="text"
          placeholder="Enter your search query"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="filter-container">
        <div className="category-selector">
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
    
      </div>
      <ul className="search-results">
        {searchResults
          .filter((result) => result.title.includes(searchQuery))
          .map((result) => (
            <li key={result.id}>
              <h3>{result.title}</h3>
              <p>Category: {result.category}</p>
              <p>Price: ${result.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
