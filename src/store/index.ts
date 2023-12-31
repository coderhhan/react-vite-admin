//Store.ts

/**
rtk的configureStore集成了redux中的combineReducers，createStore,middleware以及默认支持reduxDevTools;
*/
import { configureStore } from "@reduxjs/toolkit";

//reducer引入
import AppReducer from './App/reducer'

const store = configureStore({
  reducer: {
    app: AppReducer
  }
});
export default store;

/**
 * returnType:可以获取返回值的类型，使代码更具可维护性和可读性，
 * 特别是在处理复杂的函数类型时，可以减少手动定义类型的工作，
 * 同时增加了代码的类型安全性。它在编写高度类型化的代码或使用泛型函数时特别有用。
 * */
export type AppDispatch = typeof store.dispatch; //获取修改方法
export type RootState = ReturnType<typeof store.getState>; //获取设置的状态变量