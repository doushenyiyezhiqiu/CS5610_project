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
import Login from './components/Login/Login';
import config from './auth_config.json';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Logout from './components/Logout/Logout';

// function App() {
//   return (
//     <Router>
//       <Security oktaAuth={oktaAuth}>
//         <NavBar />
//         <Routes>
//           <Route path='/login/callback' element={<CustomLoginCallback />} />
//           <Route path="/" element={<Login />} />
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/product/:productId" element={<ProductDetails />} />
//           <Route path="/search" element={<SearchProduct />} />
//           <Route path="/cart" element={<CartDetails />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/order-history" element={<OrderHistory />} />
//           {/* Add more routes as needed */}
//         </Routes>
//       </Security>
//     </Router>
//   );
// }

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
        <AuthenticationButton />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProtectedRoute element={ProductDetails} />} />
          <Route path="/search" element={<ProtectedRoute element={SearchProduct} />} />
          <Route path="/cart" element={<ProtectedRoute element={CartDetails} />} />
          <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
          <Route path="/order-history" element={<ProtectedRoute element={OrderHistory} />} />
          {/* Define other routes */}
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Logout /> : <Login />;
};

export default App;
