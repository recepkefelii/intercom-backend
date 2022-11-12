import { useEffect,useState} from 'react'

import Navbar from '../components/navbar'
import AuthNavbar from '../components/authNavbar'
import AuthContext from '../context/authContext'
function Home() {
  

  const token = localStorage.getItem('token')
  const [user,setUser] = useState<any>('');

   
    useEffect(() => {
      if(!token){
        return
      }
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

    const data:any = {
      user,
      setUser
    }
  
  
  return (
    <AuthContext.Provider value={data}>
     <Navbar/>
    </AuthContext.Provider>
    
  )
}

export default Home