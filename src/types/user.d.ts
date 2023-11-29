

type UserInfo = {
  id: number,
  username: string,
  menus: any[]
}

type DataMenuItem = {
  id: number,
  parent_id: number,
  type: number,
  route_name: string,
  api_route_name: string,
  title: string,
  children?: Array<DataMenuItem>
  permission?: Array<DataMenuItem>
}