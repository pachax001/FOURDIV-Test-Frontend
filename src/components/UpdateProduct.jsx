import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [categories, setCategories] = useState([]); // To store all categories
  const [selectedCategory, setSelectedCategory] = useState(''); // To store selected category ID
  const [currentCategory, setCurrentCategory] = useState(''); // To display the current category name
  const navigate = useNavigate();

  // Fetch product details and categories on component mount
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  // Fetch product details by productId
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/products/${productId}`);
      setName(response.data.name);
      setCode(response.data.code);
      setSelectedCategory(response.data.categoryId); // Set the selected category ID
      setCurrentCategory(response.data.categoryName); // Set the current category name for display
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Fetch all categories to populate dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Update product on submit
  const handleUpdateProduct = async () => {
    if (!name || !code || !selectedCategory) {
      alert("All fields are required.");
      return;
    }

    // Construct the updated product object including the category object
    const updatedProduct = {
      name,
      code,
      category: {
        id: selectedCategory  // Send category as an object with its id
      }
    };

    console.log(updatedProduct);

    try {
      await axios.put(`http://localhost:8081/products/${productId}`, updatedProduct);
      navigate('/products'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Product</h1>

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
        <label className="block text-gray-700 font-medium mb-2">Current Category: {currentCategory}</label>
        <label className="block text-gray-700 font-medium mb-2">Select New Category</label>
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
        onClick={handleUpdateProduct}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
