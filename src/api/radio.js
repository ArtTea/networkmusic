// 导入基准地址
import request from '@/util/request.js'
// 获取用户电台数据
export const getUserRadio = () => {
  return request('/dj/sublist', 'GET')
}
