import { useEffect, useState, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from 'next/router'

toast.configure()

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [profileName, setProfileName] = useState('')
  const [avatarImage, setAvatarImage] = useState('#')
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const token = cookies.token

  const notify = (text,type) => {
    if(type === 'success'){
      toast.success(text,{ position: toast.POSITION.TOP_CENTER })
    }
    if(type === 'error'){
      toast.error(text,{ position: toast.POSITION.TOP_CENTER })
    }
    if(type === 'warn'){
      toast.warn(text,{ position: toast.POSITION.TOP_CENTER })
    }
    if(type === 'basic'){
      toast(text,{ position: toast.POSITION.TOP_CENTER })
    }
    if(type === 'info'){
      toast.info(text,{ position: toast.POSITION.TOP_CENTER })
    }
  } 

  const setToken = (newToken) => setCookies('token', newToken, { path: '/' })
  const deleteToken = () => removeCookies('token')
  const logout = () => {
    deleteToken()
    //router.push('/login')
    //router.reload()
    router.replace('/login/')
  }

  useEffect(() => {
    if (token) {
      axios
        .get('auth/profile/', {
          headers: {
            Authorization: 'Token ' + token,
          },
        })
        .then((response) => {
          setAvatarImage(
            'https://ui-avatars.com/api/?name=' +
              response.data.name +
              '&background=fff&size=33&color=007bff'
          )
          setProfileName(response.data.name)
        })
        .catch((error) => {
          console.log('Some error occurred')
        })
    }
  }, [setAvatarImage, setProfileName, token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        deleteToken,
        profileName,
        setProfileName,
        avatarImage,
        setAvatarImage,
        logout,
        notify,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
