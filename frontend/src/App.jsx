import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import AddProduct from './components/AddProduct';
import Homepage from './pages/Homepage';
import ContactForm from './components/ContactForm';
import Adminoptions from './pages/Adminoptions';
import CartView from './components/CartView';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/add-product" element={<Adminoptions/>} />
        <Route path="/admin/cart" element={<CartView />} />
        <Route path='/contact' element={<ContactForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
