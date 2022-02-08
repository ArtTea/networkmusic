// 导入基准地址
import request from '@/util/request.js'

// 发送或删除评价
export const pushOrDeleteComment = (form) => {
  return request('/comment', 'GET', form)
}
