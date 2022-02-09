import request from '@/util/request.js'
// 获取热门视频分类信息
export const getVideoCatgoryList = () => {
  return request('/video/category/list', 'GET')
}
// 获取全部视频分类信息
export const getVideoGroupList = () => {
  return request('/video/group/list', 'GET')
}

// 获取视频分类下的 视频信息
export const getVideoGroup = (id, offset) => {
  return request('/video/group', 'GET', { id, offset })
}
// 获取全部视频下视频信息
export const getVideoTimelineAll = (offset) => {
  return request('/video/timeline/all', 'GET', { offset })
}
// 获取全部MV信息
export const getMvAll = (from) => {
  return request('/mv/all', 'GET', from)
}
// 获取最新MV信息
export const getMvFirst = (from) => {
  return request('/mv/first', 'GET', from)
}
// 获取网易MV信息
export const getMvExclusiveRcmd = (from) => {
  return request('/mv/exclusive/rcmd', 'GET', from)
}
// 获取MV排行信息
export const getTopMv = (from) => {
  return request('/top/mv', 'GET', from)
}
