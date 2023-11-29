
interface StoreModule {
  state: any
  actions: any
  asyncActions: any
  actionNames: any
}


function getReducer(module: StoreModule) {

  let reducer = (state = { ...module.state }, action: { type: string }) => {

    let newState = JSON.parse(JSON.stringify(state))

    for (let key in module.actionNames) {

      if (action.type === module.actionNames[key]) {
        module.actions[module.actionNames[key]](newState, action);
        break;
      }
    }

    return newState
  }
  return reducer
}
export default getReducer