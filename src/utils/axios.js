import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import store from '../redux/store'

import 'nprogress/nprogress.css'

axios.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config);
  let {method,data} = config
    // 若传递过来的参数是对象形式
    if(data instanceof Object) {
      config.data = qs.stringify(data)
    }
    const {token} = store.getState().userInfo
    if(token) {
      config.headers.Authorization = 'gtto_' + token
    }
  console.log(config);
  return config;
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  // console.log(response);
  NProgress.done()
  return response.data
}, error =>{
  NProgress.done()
  // debugger;
  message.error(error.message)
  return Promise.reject(error) 
});


export default axios