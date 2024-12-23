import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const quantity = parseInt(prompt("Enter the quantity of the product you want to add:"));
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    if (!userId) {
      alert('Please log in first');
      return;
    }
  
    try {
      // Ensure productId is a string
      const response = await fetch('http://localhost:5000/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: productId.toString(), // Ensure the productId is a string
          quantity,
          phoneNumber: localStorage.getItem('phoneNumber'),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Product added to cart');
      } else {
        alert(data.message || 'Error adding product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart');
    }
  };
  

  return (
    <div className="p-4 md:p-8 bg-zinc-100">
      <h1 className="text-2xl font-bold mb-6 md:text-start ">Products </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 bg-zinc-200 rounded-xl shadow-md">
            {product.imageUrl && (
              <img
                className="h-48 w-full rounded-lg object-cover mb-4"
                src={`http://localhost:5000${product.imageUrl}`}
                alt={product.name}
              />
            )}
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-green-800 font-semibold mb-4">Price: &#8377; {product.price}</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
