import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/categories/${id}`);
      fetchCategories(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Category List</h1>
      
      {categories.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <li 
              key={category.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-gray-600">{category.code}</p>
              
              <div className="flex space-x-4 mt-4">
                <Link
                  to={`/category-products/${category.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Products
                </Link>
                <Link
                  to={`/update-category/${category.id}`} // Link to update category
                  className="text-green-500 hover:underline"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No categories found.</p>
      )}
      
      <div className="text-center mt-6">
        <Link
          to="/add-category"
          className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Category
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
