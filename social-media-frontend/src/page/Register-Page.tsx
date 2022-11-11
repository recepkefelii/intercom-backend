import React from 'react'
import Navbar from '../components/navbar'
import Register from '../components/Register'

function RegisterPage() {
  if (localStorage.getItem('token')) {
    window.location.href = '/'
  }
  return (
    <div>
    <Navbar/>
    <Register/>
    </div>
  )
}

export default RegisterPage