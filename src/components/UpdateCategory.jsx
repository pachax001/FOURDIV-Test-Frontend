import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
  const { categoryId } = useParams(); // Get category ID from the route parameters
  const [name, setName] = useState(''); // State to store the category name
  const [code, setCode] = useState(''); // State to store the category code
  const navigate = useNavigate();

  // Fetch category details when the component mounts
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/categories/${categoryId}`);
      setName(response.data.name);
      setCode(response.data.code);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = { name, code };
    try {
      await axios.put(`http://localhost:8081/categories/${categoryId}`, updatedCategory);
      navigate('/categories'); // Redirect to category list after update
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Category</h1>

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
        onClick={handleUpdateCategory}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Update Category
      </button>
    </div>
  );
};

export default UpdateCategory;
