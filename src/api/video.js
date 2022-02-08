import request from '@/util/request.js'
// 获取热门视频分类信息
export const getVideoCatgoryList = () => {
  return request('/video/category/list', 'GET')
}
// 获取全部视频分类信息
export const getVideoGroupList = () => {
  return request('/video/group/list', 'GET')
}
