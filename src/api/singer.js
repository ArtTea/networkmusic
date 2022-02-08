// 导入基准地址
import request from '@/util/request.js'
// 获取歌手热门 50 首歌曲数据
export const getSingerTopSong = (id) => {
  return request('/artist/top/song', 'GET', { id })
}
// 获取歌手专辑id数据
export const getSingerAlbum = (from) => {
  return request('/artist/album', 'GET', from)
}
// 获取歌手专辑详细数据
export const getSingerAlbumInfo = (id) => {
  return request('/album', 'GET', { id })
}
// 获取歌手描述数据
export const getSingerDesc = (id) => {
  return request('/artist/desc', 'GET', { id })
}
// 获取歌手详情数据
export const getSingerDetail = (id) => {
  return request('/artist/detail', 'GET', { id })
}
