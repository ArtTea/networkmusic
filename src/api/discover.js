// 导入基准地址
import request from '@/util/request.js'

// 获取轮播图数据
export const getBanner = () => {
  return request('/banner', 'GET')
}

// 获取推荐歌单
export const getPersonalized = (limit = 10) => {
  return request('/personalized', 'GET', { limit })
}

// 获取热门分类歌单数据
export const getHotSort = () => {
  return request('/playlist/hot', 'GET')
}

// 获取全部分类歌单数据
export const getAllSort = () => {
  return request('/playlist/catlist', 'GET')
}
// 获取分类详细歌单数据
export const getTopPlayList = ({ cat, limit = 50, offset }) => {
  return request('/top/playlist', 'GET', { cat, limit, offset })
}
// 获取排行榜全部歌单数据
export const getAllSongList = () => {
  return request('/toplist', 'GET')
}
// 获取歌手分类的数据
export const getSingerList = (checkedSort) => {
  return request('/artist/list', 'GET', checkedSort)
}
