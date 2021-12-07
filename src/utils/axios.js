import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

axios.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config);
  let {method,data} = config
  if(method.toLowerCase() === 'post') {
    // 若传递过来的参数是对象形式
    if(data instanceof Object) {
      config.data = qs.stringify(data)
    }
  }
  // console.log(config);
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
  message.error(error.message)
  return Promise.reject(error) 
});


export default axios