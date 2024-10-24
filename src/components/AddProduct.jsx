import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [categories, setCategories] = useState([]); // State to hold category options
  const [selectedCategory, setSelectedCategory] = useState(''); // State to hold selected category
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/categories');
      setCategories(response.data); // Set the fetched categories in the state
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !code || !selectedCategory) {
      alert("All fields are required, including the category.");
      return;
    }

    const product = { name, code, categoryId: selectedCategory }; // Include categoryId in product data
    console.log(product);
    try {
      await axios.post('http://localhost:8081/products', product);
      navigate('/products'); // Redirect to product list after adding
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Product Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product code"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddProduct}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
