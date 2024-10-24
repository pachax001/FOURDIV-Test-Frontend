import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import AddCategory from './components/AddCategory';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import UpdateCategory from './components/UpdateCategory';
import Header from './components/Header'; // Import the Header component
import CategoryProduct from './components/CategoryProducts';

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {/* Include the Header at the top of the app */}
        
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product/:productId" element={<UpdateProduct />} />
            <Route path="/category-products/:categoryId" element={<CategoryProduct />} />
            <Route path="/update-category/:categoryId" element={<UpdateCategory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
