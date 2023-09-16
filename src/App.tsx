'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Flowbite } from 'flowbite-react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import routes from './router'
import theme from './flowbite-theme'

const App = () => {
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' />
    </Flowbite>
  )
}

export default App
