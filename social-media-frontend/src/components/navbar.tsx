import {useEffect,useState} from 'react'
import {useContext} from 'react'
import AuthContext, { IUserInfo } from '../context/authContext'

export default function Navbar() {
  const  {user} = useContext(AuthContext)
  
  
  return (
    <div>{
    !user ? <div>
    <div className="navbar bg-slate-50">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Social Media</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
      <li><a></a></li>
      <li><a>Trends</a></li>
    </ul>
  </div>
  
</div>

</div>: 
<div className="navbar bg-slate-50">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Social Media</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={"http://localhost:8000/images/"+ user.ProfilPhotoPath} />
        </div>
      </label>
      <div>

      </div>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge"></span>
          </a>
        </li>
        <li><a></a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
}
</div>
  )
}
