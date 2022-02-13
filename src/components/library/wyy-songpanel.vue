<template>
  <div class="drawer-back" v-if="currMusic">
    <div class="top">
      <span class="down" @click="clickdown">
        <i class="iconfont icon-xiangxiajiantou"></i>
      </span>
    </div>
    <div class="middle">
      <!-- 音乐封面区域 -->
      <div class="images">
        <div class="cover">
          <img
          :src="currMusic.al.picUrl+'?param=400y400'"
          alt=""
          :class="[$store.state.user.profile.isPlay?'discAnimation':'discAnimation pause']"
          >
        </div>
        <img src="@/assets/images/disc.png" alt="" class="disc">
        <img src="@/assets/images/needle.png" alt="" class="needle"
        :class="[$store.state.user.profile.isPlay?'needlerotate':'']"
        >
      </div>
      <div class="song">
        <div class="title">{{currMusic.name}}</div>
        <div class="name">{{currMusic.ar[0].name}}</div>
        <el-scrollbar height="350px">
          <div class="songlyric">
            <div class="ltricItem" v-for="(lyric ,i) in SongLyric" :key="i">
              <p class="lyric">{{lyric[1]}}</p>
              <p v-for="(tlyric ,i) in translateLyric" :key="i"  class="tlyric">{{lyric[0]===tlyric[0]?tlyric[1]:''}}</p>
            </div>
          </div>
        </el-scrollbar>

      </div>
    </div>
    <div class="buttom">
       <!-- 精彩评论区 -->
      <WyyPanel v-if="songHotComment" >
        <template #panelheader>
          精彩评论
        </template>
        <template #panelbody>
          <WyyComment :comments="songHotComment" />
        </template>
      </WyyPanel>
      <!-- 最新评论区 -->
      <WyyPanel v-if="songNewComment" >
        <template #panelheader>
          最新评论({{total}})
        </template>
        <template #panelbody>
          <WyyComment :comments="songNewComment" />
          <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
        </template>
      </WyyPanel>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { getSongLyric, getCommentMusic } from '@/api/songInfo.js'
import { useStore } from 'vuex'
export default {
  name: 'WyySongPanel',
  props: {
    currMusic: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const SongLyric = ref([])
    const translateLyric = ref([])
    console.log(store.state.user.profile.userCurrMusicId)
    getSongLyric(store.state.user.profile.userCurrMusicId).then(data => {
      handLyric(data.lrc.lyric)
      if (data.tlyric) {
        handLyric(data.tlyric.lyric, true)
      }
    })
    const handLyric = (lyric, status) => {
      // 处理歌词:根据\n分割数组
      let arr = []
      const newarr = []
      let time = []
      let value = ''
      arr = lyric.split('\n')
      // 去除空行
      arr.forEach((item) => {
        if (item !== '') {
          newarr.push(item)
        }
      })
      arr = newarr
      arr.forEach((item) => {
      // 根据括号将歌词与实践分开
        time = item.split(']')[0]
        value = item.split(']')[1]
        // 从[之后开始截取，将分秒分开
        const newtime = time.slice(1).split(':')

        // 将结果压入最终数组
        // console.log(parseInt(t[0]))
        if (status) {
          if (value) {
            translateLyric.value.push([parseInt(newtime[0], 10) * 60 + parseFloat(newtime[1]), value])
          }
        } else {
          if (value) {
            SongLyric.value.push([parseInt(newtime[0], 10) * 60 + parseFloat(newtime[1]), value])
          }
        }
      })
    }

    // 点击下箭头关闭歌词列表
    const clickdown = () => {
      emit('clickdown', false)
    }
    // console.log(SongLyric.value)
    // console.log(translateLyric.value)
    // 无限加载
    const loading = ref(false)
    const finished = ref(false)
    // 声明歌曲最新评价的变量
    const songNewComment = ref([])
    // 声明歌曲热门评价的变量
    const songHotComment = ref([])
    // 总评价
    const total = ref(0)
    const commentPage = reactive({
      id: store.state.user.profile.userCurrMusicId,
      limit: 20,
      offset: 0
    })
    // 进行评论的无限加载
    const getData = () => {
      getCommentMusic(commentPage).then(data => {
        console.log(data)
        total.value = data.total
        if (data.comments.length) {
          songNewComment.value.push(...data.comments)
          songHotComment.value = data.hotComments
          commentPage.offset += commentPage.limit
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    return {
      SongLyric,
      translateLyric,
      clickdown,
      loading,
      finished,
      getData,
      songNewComment,
      songHotComment,
      total
    }
  }
}
</script>

<style lang="less" scoped>
.el-drawer__body{
  .drawer-back{
    min-width: 1200px;
    padding: 15px;
    height: 100%;
    width: 100%;
    padding-bottom:70px ;
    background-color: transparent;
    background:linear-gradient(to top,#fff,#EDEDED);
    // backdrop-filter:blur(50px) brightness(95%) ;
    .middle{
      display: flex;
      justify-content: center;
      margin-top: 30px;
      height: 600px;
      .images{
        position: relative;
        width: 280px;
        .disc{
          position: absolute;
          top: 75px;
          left: 50%;
          width: 250px;
          transform: translateX(-50%);
        }
        .cover{
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
          width: 180px;
          top: 110px;
          left: 50%;
          transform: translateX(-50%);
          /* 碟子设置旋转动画 */
          .discAnimation {
            /* infinite动画无限循环 */
            animation: disc 25s linear infinite;
          }

          @keyframes disc {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .pause {
            animation-play-state: paused;
            -webkit-animation-play-state: paused;
          }
         }
        .needle{
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100px;
          transform-origin:6.6px 6.6px ;
          transform: rotate(-5deg);
          transition: all .8s;
        }
        .needlerotate{
          transform: rotate(15deg);

        }
      }
      .song{
        width: 600px;
        .title{
          font-size:25px;
          text-align: center;
        }
        .name{
          font-size: 15px;
          text-align: center;
          margin: 5px 0 10px;
          color: #a8a8a8;
        }
        .songlyric{
          .ltricItem{
            text-align: center;
            font-size: 12px;
            .lyric{
              margin-top: 20px;
            }
            .tlyric{
              margin-top: 10px;
            }
          }
        }
      }
    }
    .buttom{
      padding: 0 250px;
    }
  }
}

</style>
