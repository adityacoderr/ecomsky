import React from 'react'
import ProductList from '../components/ProductList'

import { Header } from '../components/Header'
import { ContactMe } from '../components/ContactMe'
import { Footer } from '../components/Footer'
const Homepage = () => {
  return (
    <div className='w-full h-screen'>
      <Header/>
      <ProductList/>
      <ContactMe/>
      <Footer/>
    </div>
  )
}

export default Homepage
