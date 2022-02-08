import request from '@/util/request.js'
// 获取用户信息
export const getLogin = ({ phone, password }) => {
  return request('login/cellphone', 'GET', { phone, password })
}
// 获取用户歌单信息
export const getUserSongList = (uid, timestamp) => {
  return request('/user/playlist', 'GET', { uid, timestamp })
}
// 获取用户详细信息
export const getUserInfo = (uid) => {
  return request('user/detail', 'GET', { uid })
}
