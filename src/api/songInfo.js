// 导入基准地址
import request from '@/util/request.js'
// 获取歌曲详情数据
export const getSongDetail = (ids) => {
  return request('/song/detail', 'GET', { ids })
}
