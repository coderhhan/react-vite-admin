import { GET_TOKEN } from '@/utils/token'
import Login from '@/views/Login'
import { message } from 'antd'
import { memo, useEffect } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

const BeforeGoLoinPage = memo(() => {

  const navigator = useNavigate()
  useEffect(() => {
    message.warning('登陆过期或者未登陆,请先登录')
    navigator('/login')
  }, [])
  return (<></>)
})

const RouterAuth = memo((props: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null }) => {
  const token = GET_TOKEN()
  const location = useLocation()
  console.log('auth')
  const expiresIn = localStorage.getItem('expiresIn')
  // debugger
  if (!token || (token && expiresIn && (+expiresIn <= Date.now()))) {
    if (location.pathname === '/login') {
      return (<Login></Login>)
    }
    localStorage.setItem('pathname', location.pathname)
    return <BeforeGoLoinPage></BeforeGoLoinPage>
  } else if (location.pathname === '/login') {
    return <Navigate to='/home'></Navigate>
  }
  return props.children
})
export default RouterAuth