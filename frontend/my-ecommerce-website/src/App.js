import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NavBar from './components/NavBar/NavBar';
import SearchProduct from './components/SearchProduct/SearchProduct';
import CartDetails from './components/CartDetails/CartDetails';
import Checkout from './components/Checkout/Checkout';
import OrderHistory from './components/OrderHistory/OrderHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

