import request from '@/services/request/index'

enum API {
  LOGIN_URL = '/auth/login',
  PROFILE_URL = '/auth/profile',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}

export const login = (data: LoginParams) => {
  return request.post<any, ApiRespone, LoginParams>(API.LOGIN_URL, data)
}

