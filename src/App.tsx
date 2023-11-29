import { useRoutes } from 'react-router-dom'
import router from '@/router/index'
import DynamicRouter from './router/DynamicRouter'
function App() {
  const routes = useRoutes(router)
  return (
    <>
      <div className='App'>
        {/* 路由占位符Outlet 跟 vue中的 router-view 一样 组件写法*/}
        {/* <Outlet></Outlet> */}
        <DynamicRouter></DynamicRouter>
        {/* {routes} */}
      </div>
    </>
  )
}

export default App
