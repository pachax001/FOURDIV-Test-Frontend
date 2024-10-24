import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md w-full">
      <div className="container max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">My App</Link>
        </h1>

        <nav className="flex space-x-8">
          {/* Categories Navbar Item */}
          <div className="relative group">
            <button className="hover:underline text-lg">Categories</button>
            <ul className="absolute hidden group-hover:block bg-white text-black mt-0 w-48 shadow-lg rounded-lg z-10">
              <li className="p-2 hover:bg-gray-100">
                <Link to="/add-category">Add Category</Link>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <Link to="/categories">View Categories</Link>
              </li>
            
            </ul>
          </div>

          {/* Products Navbar Item */}
          <div className="relative group">
            <button className="hover:underline text-lg">Products</button>
            <ul className="absolute hidden group-hover:block bg-white text-black mt-0 w-48 shadow-lg rounded-lg z-10">
              <li className="p-2 hover:bg-gray-100">
                <Link to="/add-product">Add Product</Link>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <Link to="/products">View Products</Link>
              </li>
              
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
