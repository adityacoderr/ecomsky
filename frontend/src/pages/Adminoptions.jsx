import React from 'react'
import AddProduct from '../components/AddProduct'
import AdminPanel from '../components/AdminPanel'
import CartView from '../components/CartView'
import AdminCartView from '../components/CartAdminView'

const adminoptions = () => {
  return (
    <div>
      <AddProduct/>
      <AdminPanel/>
      {/* <CartView/> */}
      <AdminCartView/>
    </div>
  )
}

export default adminoptions
