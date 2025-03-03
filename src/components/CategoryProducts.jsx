import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/categories/${categoryId}`);
      setProducts(response.data.products); // Access products array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Products in Category</h1>
      
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <li 
              key={product.id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.code}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default CategoryProduct;
