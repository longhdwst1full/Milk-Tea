import 'react-toastify/dist/ReactToastify.css'
import { Flowbite } from 'flowbite-react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import routes from './router'
import theme from './flowbite-theme'
import { useAppSelector } from './store/hooks'
import { RootState } from './store/store'
import { useEffect } from 'react'
import { ClientSocket } from './socket'

const App = () => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  useEffect(() => {
    if (user._id) {
      ClientSocket.JoinRoom(user._id)
    }
<<<<<<< HEAD
  }, [user._id])
=======
  }, [])
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' />
    </Flowbite>
  )
}

export default App
