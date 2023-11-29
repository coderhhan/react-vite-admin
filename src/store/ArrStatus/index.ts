const store = {
  state: {
    sarr: [10, 20, 30]
  },
  actions: {
    sarrpush(newState: { sarr: number[] }, action: { type: string, val: number }) {
      newState.sarr.push(action.val)
    }
  },
  asyncActions: {  // 只放异步的方法
    asyncAdd1(dispatch: Function) {
      setTimeout(() => {
        dispatch({ type: "add1" })
      }, 1000)
    }
  },
  actionNames: {},
}
let actionNames = {}
for (let key in store.actions) {
  actionNames[key] = key
}
store.actionNames = actionNames;

export default store