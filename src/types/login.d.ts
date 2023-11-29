// 登录请求参数类型约束
interface LoginParams {
  username: string;
  password: string;
  code: string;
}

interface ApiRespone<T = any> {
  code: number,
  message: string,
  data?: T
}
