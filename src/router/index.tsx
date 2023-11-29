// import About from "@/views/About"
import Layout from "@/Layout"
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'

import Login from "@/views/Login"
import RouterAuth from "./RouterAuth"
import Role from "@/views/Access/Role"
import NotFound from "@/views/NotFound"

//react
const About = lazy(() => import("@/views/About"))
const Home = lazy(() => import("@/views/Home"))  //使用懒加载需要在组件外层包裹一层 React.Supsense,
const User = lazy(() => import("@/views/Access/User"))
const Menu = lazy(() => import("@/views/Access/Menu"))

//懒加载必须用suspense包裹高阶组件封装
const withLoadingComponent = (comp: JSX.Element) => (
  <Suspense>
    {comp}
  </Suspense>
)

function MyRedirect(props: { to: string }) {
  const navigator = useNavigate()
  useEffect(() => {
    if (window.location.pathname === '/access') {
      navigator(props.to)
    }
  }, [])
  return <Outlet />
}

const routes: SyncRoute[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    name: 'home',
    element: <RouterAuth><Layout /></RouterAuth>,
    children: [
      {
        path: '/home',
        name: 'Home',
        element: withLoadingComponent(<RouterAuth><Home /></RouterAuth>),
      },
      {
        path: '/access',
        name: 'Access',
        element: <MyRedirect to="/access/menu" />,
        children: [
          {
            path: '/access/menu',
            name: 'Menu',
            element: withLoadingComponent(<Menu />),
          },
          {
            path: '/access/user',
            name: 'User',
            element: withLoadingComponent(<User />),
          },
          {
            path: '/access/role',
            name: 'Role',
            element: withLoadingComponent(<Role />),
          }
        ]
      },

      {
        path: '/about',
        element: withLoadingComponent(<About />),
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },

]


// findRoute(routes, "2")

export default routes