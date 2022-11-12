import React, { useState } from 'react'
import axios from "axios";
import { Form } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const Loginreq = async (d:React.FormEvent<HTMLFormElement>) => {
      d.preventDefault()
      const login = await axios.post("http://localhost:8000/api/auth/login", {
      "email": email,
      "password":password,
    },
    
    )
    localStorage.setItem('token', login.data['accessToken'])
  if(localStorage.getItem('token')) {
    setTimeout(() => window.location.reload(), 2000);
  }
  }
  const notify = () => toast("Registered!");

  return (
    <form className='' onSubmit={(d:React.FormEvent<HTMLFormElement>) => Loginreq(d)}>
    <div>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now Social Media</h1>
      <p className="py-6">Do you want to make new friends?</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onChange={(e) => setEmail(e.target.value)}
            value={email} 
          type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}
          type="text" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onClick={notify} type='submit' className="btn btn-primary">Login</button>
          <button className="btn btn-success mt-6">Create Account</button>
          <ToastContainer
position="top-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
    </form>
    
  )
}

export default Login