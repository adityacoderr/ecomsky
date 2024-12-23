import React, { useEffect, useState } from 'react';

const AdminCartView = () => {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin-cart/admin/carts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCarts(data);  // Store the carts data
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching admin carts:', error);
        setError('Failed to fetch cart data');
      }
    };

    fetchCarts();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Cart Overview</h1>
      {error && <p className="text-red-600">{error}</p>}
      {carts.length === 0 ? (
        <p className="text-center text-gray-600">No active carts available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) =>
                cart.items.map((item) => (
                  <tr key={item._id}>
                    {/* Display phone number */}
                    <td className="py-3 px-6">
                      {cart.phone || 'N/A'}
                    </td>
                    {/* Display product name */}
                    <td className="py-3 px-6">
                      {item.productId ? item.productId.name : 'Product Not Found'}
                    </td>
                    {/* Display quantity */}
                    <td className="py-3 px-6">{item.quantity}</td>
                    {/* Display price */}
                    <td className="py-3 px-6">
                      {item.productId ? `₹ ${item.productId.price}` : 'N/A'}
                    </td>
                    {/* Display total */}
                    <td className="py-3 px-6">
                      {item.productId ? `₹ ${item.productId.price * item.quantity}` : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCartView;
