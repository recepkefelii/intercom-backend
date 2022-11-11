import React from 'react'
import Login from '../components/Login'
import Navbar from '../components/navbar'

export default function LoginPage() {
  if (localStorage.getItem('token')) {
    window.location.href = '/'
  }
  return (
    <div>
        <Navbar/>
        <Login/>
    </div>
  )
}
