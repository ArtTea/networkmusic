// 导入基准地址
import request from '@/util/request.js'
// 获取歌曲详情数据
export const getSongDetail = (ids) => {
  return request('/song/detail', 'GET', { ids })
}
// 获取歌曲歌词数据
export const getSongLyric = (id) => {
  return request('/lyric', 'GET', { id })
}
// 获取歌曲评论数据
export const getCommentMusic = (from) => {
  return request('/comment/music', 'GET', from)
}
