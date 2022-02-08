// 1.创建一个新的axios实例

// 导入axios包
import axios from 'axios'

// 导入路由
// import router from '@/router/index.js'
// 导出求根地址，原因：其他地方可能有不是通过axios发请求的地方用的到根地址
export const baseURL = 'http://localhost:3000/'
const instance = axios.create({
  // axios的基本配置：请求根地址和请求失效时间
  baseURL,
  timeout: 5000
})
// !!!!!!这句话绝对要写，写了cookie才能添加进去，axios默认会阻止添加cookie，弄了我好久才发现
instance.defaults.withCredentials = true
// 2.请求拦截器，如果过有token进行数据携带
instance.interceptors.request.use((config) => {
  // 拦截业务逻辑
  // 进行请求配置的修改

  return config
}, (err) => {
  return Promise.reject(err)
})
// 3.响应拦截器，：1.剥离无效数据
instance.interceptors.response.use((res) => res.data, (err) => {
  return Promise.reject(err)
})
// 4.导出一个函数，调用当前的axios实例发请求
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1.如果是get请求，需要用params来接受数据
    // 2.如果是posh请求。需要用data来接受数据
    // [可以设置一个动态参数，通过method来判断请求时GET还是POST
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
