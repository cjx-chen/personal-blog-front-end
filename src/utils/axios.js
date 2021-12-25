import axios from 'axios'
import router from '../router/index'
import config from '../config'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
// axios.defaults.withCredentials = true

// 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localGet('token') || ''

// 默认 post 请求，使用 multipart/form-data 形式
axios.defaults.headers.post["Content-Type"] = "multipart/form-data;charset=UTF-8";

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (typeof res !== 'object') {
    message.error('服务端异常！');
    console.log('服务端异常！');
    return Promise.reject(res)
  }
  if (res.status != 200) {
    if (res) {
      console.error(res.data)
    }
    return Promise.reject(res)
  }

  return res
})

export default axios