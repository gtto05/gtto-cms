import { SAVE_MENU_TITLE } from '../../utils/constant'


let initState = ''

export const menuReducer = (preState = initState,action) => {
  const {type, data} = action
  let newState
  switch (type) {
    case SAVE_MENU_TITLE:
      newState = initState + data
      return newState;
    default:
      return preState;
  }
}