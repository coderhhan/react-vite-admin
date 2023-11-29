
import request from '@/services/request/index'

enum API {
  PROFILE_URL = '/users/profile',
}

export const profile = () => {
  return request.get<any, ApiRespone<UserInfo>>(API.PROFILE_URL)
}