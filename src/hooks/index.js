import dayjs from 'dayjs'
import { ref } from 'vue'
// 处理音乐时长的函数
export const handleMusicTime = (time) => {
  return dayjs(time).format('mm:ss')
}
// 处理创建时间的函数
export const getcreateTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD')
}
// 处理播放数量的函数
export const handpalycount = (count) => {
  const play = ref(0)
  if (count > 10000) {
    play.value = Math.floor(count / 1000) / 10
  } else {
    play.value = count
  }
  return play
}
// 梳理秒数转化成分钟

export const handleminuteTime = (time) => {
  return dayjs().second(time)
}
