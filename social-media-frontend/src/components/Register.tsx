import {useState} from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [username,setUsername] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [first_name,setFirstName] = useState<string>('')
    const [last_name,setLastName] = useState<string>('')

  const postReq = async (q:React.FormEvent<HTMLFormElement>) => {
    q.preventDefault()
    const res = await axios.post("http://localhost:8000/api/auth/register", {
    "username":username,
    "email": email,
    "password":password,
    "firstName": first_name,
    "lastName": last_name,
  },
  )
  
  localStorage.setItem('token', res.data['accessToken'])
  if(localStorage.getItem('token')) {
    setTimeout(() => window.location.reload(), 2000);
  }
  }
  // refresh page
  const notify = () => toast("Registered!");
  

  return (
    <form className='input' onSubmit={(d:React.FormEvent<HTMLFormElement>) => postReq(d)}>
    <div className='grid h-screen place-items-center'>
        <div className="card flex-shrink-1 w-full max-w-sm shadow-2xl bg-base-100 ">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onChange={(e) => setEmail(e.target.value)}
            value={email}  
          type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className='form-control'>
            <label className='label'>
                <span className='label-text'>Username</span>
            </label>
            <input onChange={(e) => setUsername(e.target.value)}
            value={username} 
            type="text" placeholder="username" className="input input-bordered" />                 
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}
          type="text" placeholder="password" className="input input-bordered" />
          <div className='form-control'>
            <label className='label'>
                <span className='label-text'>First Name</span>
            </label>
            <input onChange={(e) => setFirstName(e.target.value)}
            value={first_name}
            type="text" placeholder="first name" className="input input-bordered" />                 
        </div>
        <div className='form-control'>
            <label className='label'>
                <span className='label-text'>Last Name</span>
            </label>
            <input onChange={(e:any) => setLastName(e.target.value)}
            value={last_name}
            type="text" placeholder="last name" className="input input-bordered" />                 
        </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onClick={notify} type='submit' className="btn btn-primary">Register</button>
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
    </form>
  )
}

export default Register