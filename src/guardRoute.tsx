import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { RootState } from './store/store'
import { useAppSelector } from './store/hooks'
import { useEffect } from 'react'

interface Props {
  JSX: () => JSX.Element
}

export const GuardSign = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if (user.role?.name === 'admin' && user.role.status === 'active') {
      navigate('/admin')
    } else if (user.role?.name === 'customer') {
      navigate('/')
    }
  }, [user])
  return !user.role?.name ? <JSX /> : <Navigate to={'/'} />
}

export const GuardAccount = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if (user.role?.name === 'admin' && user.role.status === 'active') {
      navigate('/admin')
    } else if (!user.role?.name) {
      navigate('/')
    }
  }, [user])
  return user.role?.name === 'customer' ? <JSX /> : <Navigate to={'/'} />
}

const GuardAuth = () => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.role?.name) {
      navigate('/signin')
    }
  }, [user])
  return user.role?.name === 'admin' && user.role.status === 'active' ? <Outlet /> : <Navigate to={'/signin'} />
}

export default GuardAuth
