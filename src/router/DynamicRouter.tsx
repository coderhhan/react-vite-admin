
import { memo, useEffect } from 'react'
import routes from '.'
import { useAppSelector } from '@/store/hooks'
import { RouteObject, RouteProps, useRoutes } from 'react-router-dom'
const DynamicRouter = () => {
  const app = useAppSelector(state => state.app)
  const storage = localStorage.getItem('userInfo')
  const menus = app.menus.length > 0 ? app.menus : (storage ? JSON.parse(storage).menus : [])
  const result = [...routes]
  const layoutRoute = result.find(item => item.name === 'home')
  const pageRoute: any[] = []
  menus.forEach((i: any) => {
    if (i.children) {
      pageRoute.push(...i.children)
      pageRoute.push(i)
    } else {
      pageRoute.push(i)
    }
  })
  filterRoute([layoutRoute] as SyncRoute[], pageRoute)
  // console.log(routes, 'routes')
  const route = useRoutes(routes)
  return route
}

export default memo(DynamicRouter)


function filterRoute(tree: SyncRoute[], routes: Array<DataMenuItem>) {
  if (routes.length === 0) return
  tree.forEach((item, index) => {
    if (item.children) {
      filterRoute(item.children, routes)
    }
    if (!(routes.some((i: any) => i.route_name === item.name) || item.name === 'Home')) {

      tree.splice(index, 1)
    }
  })

}