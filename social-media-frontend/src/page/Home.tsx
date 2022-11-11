import { useEffect,useState} from 'react'

import Navbar from '../components/navbar'
import AuthContext from '../context/authContext'
function Home() {
  const [user,setUser] = useState<any>({});

  const token = localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }
    useEffect(() => {
      fetch('http://localhost:8000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(data => {
        setUser(data)
      })
    }, [])
  
  
  return (
    <AuthContext.Provider value={user}>
        <Navbar/>
        {
          user ? (
            <div>
              <h1>Home</h1>
              <h2>{user.username}</h2>
            </div>
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )

        }
    </AuthContext.Provider>
    
  )
}

export default Home