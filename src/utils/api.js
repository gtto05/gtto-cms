import axios from './axios'
import {BSAE_URL} from './constant'

// 发送请求 axios
export const reqLogin = (values) => axios.post(`${BSAE_URL}/login`, values)

// fetch
// fetch('http://localhost:3000/login',{
//   method:'POST',
//   headers: {
//     // 'Content-Type': 'application/json'
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body:qs.stringify(values)
// })
// .then(res=>res.json())
// .then(data=>console.log(data))


// 获取商品分类列表
export const reqCategoryList = () => axios.get(`${BSAE_URL}/manage/category/list`)

// TODO:新增商品分类
export const reqAddCategory = ({categoryName}) => axios.post(`${BSAE_URL}/manage/category/add`, {categoryName})

// 修改商品分类
export const reqUpdateCategory = (values) => axios.post(`${BSAE_URL}/manage/category/update`,values )


