import {combineReducers} from 'redux'
import {loginReducer} from './loginReducer'

export default combineReducers({
  // key决定着store中保存该状态的key
  // value决定着store中保存该状态的value
  userInfo:loginReducer
})