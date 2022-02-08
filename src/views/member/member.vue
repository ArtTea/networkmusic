<template>
<el-scrollbar>
  <div class="member-container">
    <div class="user">
      <div class="images">
        <img src="http://p1.music.126.net/Kwbyg-cVq_bUN-KCv08tTw==/109951166892168301.jpg?param=400y400" alt="">
      </div>
      <div class="userInfo">
          <div class="title">
            <div class="username">{{userInfo.nickname}}</div>
            <div class="logout">
              <i class="iconfont icon-tuichudenglu"></i>
              退出登录</div>
          </div>
          <div class="leve">
            <span>Lv.{{userInfo.level}}</span>
          </div>
        <div class="dataitem">
          <div class="data">
            <span class="number">{{userInfo.eventCount}}</span>
            <span class="text">动态</span>
          </div>
          <div class="data">
            <span class="number">{{userInfo.follows}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data">
            <span class="number">{{userInfo.followeds}}</span>
            <span class="text">粉丝</span>
          </div>
        </div>
        <div class="userItem">
          <div class="key">用户ID:</div>
          <div class="value">{{userInfo.userId}}</div>
        </div>
        <div class="userItem">
          <div class="key">所在地区:</div>
          <div class="value">{{userInfo.province}} {{userInfo.city}}</div>
        </div>
        <div class="userItem">
          <div class="key">个人介绍:</div>
          <div class="value">{{userInfo.signature}}</div>
        </div>
      </div>
    </div>
      <ul class="nav">
        <li @click="activeName='create'" :class="{active:activeName==='create'}">创建的歌单</li>
        <li @click="activeName='collect'" :class="{active:activeName==='collect'}">收藏的歌单</li>
        <li @click="activeName='radio'" :class="{active:activeName==='radio'}">收藏的播客</li>
        <li @click="activeName='column'" :class="{active:activeName==='column'}">创建的专栏</li>
      </ul>
    <div class="body">
      <div v-if="activeName==='create'" class="create">
        <WyyItem :List= 'SongList'/>
      </div>
      <div v-if="activeName==='collect'" class="collect">
        <WyyItem :List= 'collectList' @clickWyyItem='clickWyyItem' />
      </div>
      <div v-if="activeName==='radio'" class="radio">
        <WyyRadio :radio='userRadio'/>
      </div>
      <div v-if="activeName==='column'" class="column">创建的专栏</div>
    </div>
  </div>
</el-scrollbar>
</template>

<script>
import { ref, watch } from 'vue'
import { getUserSongList, getUserInfo } from '@/api/user.js'
import { getUserRadio } from '@/api/radio.js'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'Member',
  setup () {
    // 激活的导航
    const activeName = ref('create')
    const route = useRoute()
    // 用户基本信息
    const userInfo = ref([])
    // 创建的歌单
    const SongList = ref([])
    // 收藏的歌单
    const collectList = ref([])
    // 用户收藏的电台
    const userRadio = ref([])
    watch(() => route.params.id, (newVal) => {
      // 请求用户基本信息
      getUserInfo(newVal).then(data => {
        userInfo.value = data.profile
        userInfo.value.level = data.level
      })
      // 请求用户的歌单基本信息
      getUserSongList(newVal).then(data => {
        const index = data.playlist.findIndex(item => item.subscribed === true)
        SongList.value = data.playlist.slice(0, index)
        collectList.value = data.playlist.slice(index)
      })
    }, { immediate: true })
    if (activeName.value === 'create') {
      getUserRadio(route.params.id).then(data => {
        userRadio.value = data.djRadios
      })
    }
    const router = useRouter()
    const clickWyyItem = (id) => {
      router.push(`/musiclistdetail/${id}`)
    }
    return {
      activeName,
      SongList,
      collectList,
      userInfo,
      userRadio,
      clickWyyItem

    }
  }
}
</script>

<style lang="less" scoped>
.member-container{
  padding:0 15px;
  font-size: 12px;
  .user{
    display: flex;
    margin: 40px 15px;
    img{
      width : 230px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    .userInfo{
        width: 100%;
        padding-left:20px ;
        .title{
          display: flex;
          justify-content: space-between;
          .username{
            font-size: 28px;
            font-weight: 600;
          }
          .logout{
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 20px;
            &:hover{
              background-color: #ececec;
            }
          }
        }
        .leve{
          padding: 11px 0;
          border-bottom: 1px solid #eee;
          span{
            display: inline-block;
            font-size: 10px;
            width: 40px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #eee;
            border-radius:10px ;
          }
        }
        .dataitem{
          display: flex;
          >span{
            display: block;
            text-align: center;
          }
          .number{
            font-size: 20px;
          }
          .text{
            font-size: 10px;
            color: #333;
          }
        }
        .data{
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          width: 80px;
          text-align: center;
          border-right:1px solid #ececec ;
          &:last-child{
            border-right:none ;
          }
        }
        .userItem{
          margin-top:6px ;
          display: flex;
          .value{
            padding-left: 5px;
          }
        }
    }
  }
   .nav{
    height: 60px;
    li{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin: 0 20px;
    }
    .active{
      position: relative;
      color: #000;
      font-size: 20px;
      font-weight: 600;
      &::after{
        content: '';
        position: absolute;
        bottom:-5px;
        left: 0;
        height: 4px;
        width: 80%;
        margin: 0 10%;
        background-color:#EC4141;
      }
    }
  }
}
</style>
