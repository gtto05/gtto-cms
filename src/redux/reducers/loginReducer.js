import { ADD_USER_INFO } from '../../utils/constant'

let user = JSON.parse(localStorage.getItem('user')) || ''
let token = localStorage.getItem('token') || ''

let initState = {
  user,
  token ,
  isLogin:user && token ? true:false
}
console.log(initState);

export const loginReducer = (preState = initState,action) => {
  const {type, data} = action
  let newState
  switch (type) {
    case ADD_USER_INFO:
      newState = {user:data.user,token:data.token,isLogin:true}
      return newState;
    default:
      return preState;
  }
}