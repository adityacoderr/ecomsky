import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex gap-4 items-center w-full h-16 px-4 py-4 bg-zinc-300">
    
    <Link to="/home">Home</Link>
    <Link to="/admin">Admin Panel</Link>
    <Link to="/contact">Contact Us</Link>
      
    </nav>
  );
};

export default Navbar;
