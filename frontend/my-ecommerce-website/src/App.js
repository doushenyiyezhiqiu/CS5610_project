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
import config from './auth_config.json';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const App = () => {
  // Determine the URL where you want users to be redirected after login or logout.
  const onRedirectCallback = (appState) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  };

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProtectedRoute element={ProductDetails} />} />
          <Route path="/search" element={<ProtectedRoute element={SearchProduct} />} />
          <Route path="/cart" element={<ProtectedRoute element={CartDetails} />} />
          <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
          <Route path="/order-history" element={<ProtectedRoute element={OrderHistory} />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};


export default App;
