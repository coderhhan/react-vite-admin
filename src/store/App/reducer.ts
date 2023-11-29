

/**
PayloadAction：是 Redux Toolkit 中的一个类型，它用于定义 action 的结构以及传递给 reducer 的数据
**/
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "@/services/loginApi";
import { SET_TOKEN } from "@/utils/token";
import { profile } from "@/services/userApi";

const userInfo = localStorage.getItem('userInfo')
const initialState: CollapsedState = {
  data: 222,
  token: '',
  id: null,
  username: '',
  menus: userInfo ? JSON.parse(userInfo).menus : [],
  permissions: userInfo ? JSON.parse(userInfo).permissions : [],
  routes: userInfo ? JSON.parse(userInfo).routes : [],
}

export const addAsync = createAsyncThunk(
  'incrementAsync',
  async (num: number) => {
    // 返回一个Promise对象，Promise对象的结果类型为number
    const res = await new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(num)
      }, 3000)
    })
    return res + 10
  }
)


export const loginAsync = createAsyncThunk(
  'loginAsync',
  async (data: LoginParams) => {
    const res = await login(data)
    return res
  }
)


export const profileAsync = createAsyncThunk(
  'profileAsync',
  async () => {
    const res = await profile()
    return res
  }
)


const AppReducerSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    //定义reducer更新状态数据的函数 ，setisCollapsed方法在后期组件中执行dispatch时是作为action函数的函数名去使用
    add(state, action: PayloadAction<{ num: number }>) { //传入两个参数1state(代理的proxy对象),一个是action
      console.log(state.data, "state");
      console.log(action, "action");
      console.log(action.payload, "payload");
      state.data += 10
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      const { id, username, menus } = action.payload!
      state.id = +id
      state.username = username
      state.menus = menus
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addAsync.fulfilled, (state, { payload }) => {
      state.data += payload //payload 会拿到
      console.log('fulfilled', payload)
    }),
      builder.addCase(addAsync.pending, (state, { payload }) => {
        console.log('pending')
      })
    builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
      if (payload.data && payload.data.token) {
        state.token = payload.data.token //储存token
        SET_TOKEN(payload.data.token)
        localStorage.setItem('expiresIn', payload.data.expiresIn)
      }
    }),
      builder.addCase(profileAsync.fulfilled, (state, { payload }) => {
        const userInfo = JSON.stringify(payload.data)
        localStorage.setItem('userInfo', userInfo)
        const { id, username, menus, routes, permissions } = payload.data!
        state.id = +id
        state.username = username
        state.menus = menus
        state.routes = routes
        state.permissions = permissions
      })
  }

})


export interface CollapsedState {
  data: number
  token: string,
  id: number | null,
  username: string,
  menus: DataMenuItem[],
  permissions: DataMenuItem[]
  routes: DataMenuItem[]
}



export const {
  add
} = AppReducerSlice.actions;

export const add2 = () => { }
export default AppReducerSlice.reducer