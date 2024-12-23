import React, { useEffect, useState } from 'react';

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const phoneNumber = localStorage.getItem('phoneNumber');
  console.log(phoneNumber);
  
  useEffect(() => {
    // Retrieve userId and token from localStorage or your authentication state
    const storedUserId = localStorage.getItem('userId'); // Adjust this logic based on your auth flow
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    
    setUserId(storedUserId);

    if (storedUserId && token) {
      // Fetch cart items
      const fetchCartItems = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/cart/cart-items/${storedUserId}`);
          const data = await response.json();
          setCartItems(data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      // Fetch user details (including phone number) with token
      const fetchUserDetails = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/user/user-details', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUserDetails(data); // Set the user details
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchCartItems();
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-start">Cart Items</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No cart items available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              {item.productId.imageUrl && (
                <img
                  src={`http://localhost:5000${item.productId.imageUrl}`}
                  alt={item.productId.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{item.productId.name}</h3>
              <p className="text-gray-600 mb-2">{item.productId.description}</p>
              <p className="text-green-600 font-semibold mb-2">
                Price: &#8377; {item.productId.price}
              </p>
              <p className="text-gray-700 font-medium">
                Quantity: <span className="font-bold">{item.quantity}</span>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>User Phone:</strong> {phoneNumber}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartView;
