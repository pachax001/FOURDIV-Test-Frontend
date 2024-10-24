import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    if (!name || !code) {
      setError('Both fields are required');
      return;
    }

    const category = { name, code };
    try {
      await axios.post('http://localhost:8081/categories', category);
      navigate('/categories'); // Redirect to categories list after successful addition
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Error adding category. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add Category</h1>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category name"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category code"
        />
      </div>

      <button
        onClick={handleAddCategory}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Category
      </button>
      
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/categories')}
          className="text-blue-500 hover:underline"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
