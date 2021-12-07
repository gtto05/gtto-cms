import {ADD_USER_INFO,DELETE_USER_INFO} from '../../utils/constant'

export const createSaveLoginAction = (data) => ({type: ADD_USER_INFO,data})
export const createDeleteLoginAction = (data) => ({type: DELETE_USER_INFO,data})