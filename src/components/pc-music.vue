<template>
<div class="container" >
  <audio
  :src="musicInfo.url"
  ref='target'
  autoplay
  @timeupdate="updateTime"
  ></audio>
  <div class="cover" >
    <img v-if="currMusic" :src="currMusic.al.picUrl" alt="">
    <img v-else src="@/assets/images/defaulTavatar.jpg" alt="">
    <div class="body" v-if="currMusic">
      <div class="title">{{currMusic.name}}</div>
      <div class="name">{{currMusic.ar[0].name}}</div>
    </div>
  </div>
  <div class="status" >

   <div class="toggle">
    <i class="iconfont icon-shanchu"></i>
    <i class="iconfont icon-shangyishou"></i>
    <span @click="changePlayMusic()">
      <i v-if="$store.state.user.profile.isPlay"  class="iconfont icon-zanting"></i>
      <i v-else class="iconfont icon-bofang"></i>
    </span>
    <i class="iconfont icon-xiayishou"></i>
   </div>
    <div class="progressBar">
      <span>{{handleMusicTime(time*1000)}}</span>
        <div class="block">
          <el-slider v-model="time" :show-tooltip="false" :max="maxTime/1000"></el-slider>
        </div>
      <span>{{handleMusicTime(maxTime)}}</span>
    </div>
  </div>
  <div class="attributes">
    <div class="volume">
      <i v-if="volume===0" class="fr iconfont icon-jingyin" ></i>
      <i v-else class="fr iconfont  icon-yinliang1" ></i>
    </div>
    <div class="block">
      <el-slider
      v-model="volume "
      :show-tooltip="false"
      @input='changevolume'
      ></el-slider>
    </div>
    <div class="list">
    <i class="fr iconfont icon-liebiao"></i>
    </div>
  </div>
</div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getMusicInfo } from '@/api/playlist.js'
import { useRoute } from 'vue-router'
import { handleMusicTime } from '@/hooks'
import { getSongDetail } from '@/api/songInfo.js'
export default {
  naem: 'Music',
  setup () {
    const store = useStore()
    const router = useRoute()
    // 存放请求回来的音乐数据
    const musicInfo = ref('')
    // 存放vuex中的profile数据
    const profile = ref(store.state.user.profile)
    // 存放之后筛选出来的数据
    const currMusic = ref(null)
    // ref属性操作dom
    const target = ref(null)
    // 获取当前音频播放的时长
    const time = ref(0)
    // 获取当前播放音频的总时长
    const maxTime = ref(0)
    // 声明音量的变量
    const volume = ref(30)
    // 声明控制暂停播放的变量
    const toggle = ref(profile.value.isPlay)
    // 切换歌曲时的函数
    const updateMisic = (id) => {
      // 请求音频地址
      console.log(profile.value.userCurrsongList)
      getMusicInfo(id).then(data => {
        musicInfo.value = data.data[0]
      })
      // 通过id筛选出当前播放音乐的的姓名和标题
      if (profile.value.userCurrsongListId === parseInt(router.params.id)) {
        // currMusic.value = profile.value.userCurrsongList.find(item => {
        //   return item.id === profile.value.userCurrMusicId
        // })
        getSongDetail(profile.value.userCurrMusicId).then(data => {
          console.log(data.songs[0])
          currMusic.value = data.songs[0]
          console.log(currMusic.value.dt)
          maxTime.value = currMusic.value.dt
        })
      }
    }
    // 确认音频当前播放时长
    const updateTime = () => {
      time.value = Math.floor(target.value.currentTime)
    }
    const changePlayMusic = () => {
      if (musicInfo.value) {
        toggle.value = !toggle.value
        toggle.value ? playMusic() : pauseMusic()
      }
    }
    // 暂停
    const pauseMusic = () => {
      store.commit('user/setPalyStatus', toggle.value)
      console.log(toggle.value)
      target.value.pause()
    }
    // 播放
    const playMusic = () => {
      store.commit('user/setPalyStatus', toggle.value)
      console.log(toggle.value)
      target.value.play()
    }

    // 音量改变事件
    const changevolume = () => {
      console.log(volume.value)
      target.value.volume = volume.value / 100
    }
    // 监听音乐id的变化
    watch(() => profile.value.userCurrMusicId, (newVal) => {
      if (profile.value.isPlay) {
        updateMisic(newVal)
        console.log('1')
      }
      // const time  = target.audioPlayer.currentTime
      // 确定音乐播放的状态
    }, { immediate: true })
    return {
      currMusic,
      musicInfo,
      updateTime,
      target,
      time,
      handleMusicTime,
      maxTime,
      changePlayMusic,
      changevolume,
      volume
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E0E0E0;
  background-color: #fff  ;
  width: 100%;
  .cover{
    padding-left: 15px;
    width: 250px;
    font-size: 14px;
    display: flex;
    img{
      display: block;
      border-radius: 10px;
      width: 50px;
      height: 50px;
    }
    .body{
      padding-left: 5px;
      .title{
        white-space:nowrap;
      }
      .name{
        margin-top: 8px;
      }
    }
  }
  // 进度条的样式

  :deep(.el-slider){
    height: 15px;
      .el-slider__runway{
      background-color: #cdcdcd;
      height: 4px;
      .el-slider__button{
        width: 10px;
        height: 10px;
        border: 0;
        background-color: #EC4141;
      }
      .el-slider__bar{
        height: 4px;
        background-color: #FF4E4E;
      }
    }
  }

  .status{
    height: 70px;
    .toggle{
      display: flex;
      padding-top:15px ;
      justify-content: center;
      width: 100%;
      i{
        line-height: 35px;
        font-size: 30px;
        margin: 0 20px;
      }
      .icon-arrow_right_fat{
        font-size: 40px;
        text-align: center;
      }
    }
    .progressBar{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 15px;
      width: 600px;
      >span{
        text-align: center;
        width: 60px;
      }
      .block{
        flex: 1;
        }
      }
  }
  .attributes{
    display: flex;
    justify-content:space-between;
    align-items: center;
    height: 60px;
    width: 300px;
    margin-right: 20px;

    .volume{
      flex: 1;
      padding-right: 15px;
      i{
        font-size:25px;
    }
    }
    .block{
      flex: 3;
    }
    .list{
      flex: 1;
      >i{
      font-size:20px;

      }
    }
  }
}

</style>
