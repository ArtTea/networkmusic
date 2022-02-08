// 导入基准地址
import request from '@/util/request.js'

// 获取歌单详情数据
export const getPlaylistDetail = (id) => {
  return request('/playlist/detail', 'GET', { id })
}
// 获取歌单用户评价数据
export const getCommentPlaylist = (form) => {
  return request('/comment/playlist', 'GET', form)
}
// 获取歌单用户收藏数据
export const getPlaylistSubscribers = (form) => {
  return request('playlist/subscribers', 'GET', form)
}

// 获取歌单列表中的音乐数据
export const getMusicInfo = (id) => {
  return request('/song/url', 'GET', { id })
}
