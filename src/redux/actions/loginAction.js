import {ADD_USER_INFO,DELETE_USER_INFO} from '../../utils/constant'

export const createSaveLoginAction = (data) => {
  localStorage.setItem('user',JSON.stringify(data.user))
  localStorage.setItem('token',data.token)
  localStorage.setItem('isLogin',true)
  return {type: ADD_USER_INFO,data}
}
export const createDeleteLoginAction = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
}