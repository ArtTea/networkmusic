<template>
<el-scrollbar>
  <div class="asidenav">
  <!-- 侧边栏 -->
  <!-- 上半部分固定 -->
    <ul >
      <li
       @click="activeName=item.name"
       :class="{active:activeName===item.name}"
       class="musiclist" v-for="item in defaultList"
       :key="item.name">
        <RouterLink :to="item.path" >
          <span>{{item.name}}</span>
        </RouterLink>
      </li>
    </ul>
    <!-- 中间标题 -->
    <div class="title">我的音乐</div>
    <ul >
      <li
      @click="activeName='本地下载'"
      :class="{active:activeName==='本地下载'}"
      class="musiclist" >
        <RouterLink to="/">
          <i class="iconfont icon-xiazai1" ></i>
          <span>本地下载</span>
        </RouterLink>
      </li>
      <li
      @click="activeName='最近播放'"
      :class="{active:activeName==='最近播放'}"
      class="musiclist" >
        <RouterLink to="/">
          <i class="iconfont icon-shizhong" ></i>
          <span>最近播放</span>
        </RouterLink>
      </li>
      <li
      @click="activeName='我的音乐云盘'"
      :class="{active:activeName==='我的音乐云盘'}"
      class="musiclist" >
        <RouterLink to="/">
          <i class="iconfont icon-yun1" ></i>
          <span>我的音乐云盘</span>
        </RouterLink>
      </li>
      <li
      @click="activeName='我的播客'"
      :class="{active:activeName==='我的播客'}"
      class="musiclist" >
        <RouterLink to="/">
          <i class="iconfont icon-guanzhu" ></i>
          <span>我的播客</span>
        </RouterLink>
      </li>
      <li
      @click="activeName='我的收藏'"
      :class="{active:activeName==='我的收藏'}"
      class="musiclist">
        <RouterLink to="/">
          <i class="iconfont icon-wodeshoucang1" ></i>
          <span>我的收藏</span>
        </RouterLink>
      </li>
    </ul>
    <!-- 用户的部分 -->
    <dl >
      <dt class="title">
        创建的歌单
        <i class="iconfont icon-arrow_down_fat"></i>
        <span>+</span>
      </dt>
      <dd
      @click="activeName=item.name"
      :class="{active:activeName===item.name}"
      class="musiclist"
      v-for="item in mySongList"
      :key="item.id">
        <RouterLink :to="`/musiclistdetail/${item.id}`">
          <i class="iconfont icon-music_playlist" ></i>
          <span >{{item.name}}</span>
        </RouterLink>
      </dd>
    </dl>
    <!-- 用户收藏的歌单 -->
    <dl >
      <dt class="title">
        创建的歌单
        <i class="iconfont icon-arrow_down_fat"></i>
        <span>+</span>
      </dt>
      <dd
      @click="activeName=item.name"
      :class="{active:activeName===item.name}"
      class="musiclist"
      v-for="item in mycollectList"
      :key="item.id">
        <RouterLink :to="`/musiclistdetail/${item.id}`">
          <i class="iconfont icon-music_playlist" ></i>
          <span >{{item.name}}</span>
        </RouterLink>
      </dd>
    </dl>
  </div>
</el-scrollbar>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { getUserSongList } from '@/api/user.js'
export default {
  name: 'AsideNav',
  setup () {
    const defaultList = [
      { name: '发现音乐', path: '/discover' },
      { name: '视频', path: '/video' },
      { name: '关注', path: '/discover' },
      { name: '直播', path: '/discover' },
      { name: '私人FM', path: '/discover' }
    ]
    const store = useStore()
    // 自己的歌单
    const mySongList = ref([])
    // 收藏的歌单
    const mycollectList = ref([])
    // 判断是否登录，然后渲染页面
    if (store.state.user.profile.userId) {
      const timestamp = Date.parse(new Date())
      getUserSongList(store.state.user.profile.userId, timestamp).then(data => {
        const index = data.playlist.findIndex(item => item.subscribed === true)
        mySongList.value = data.playlist.slice(0, index)
        mycollectList.value = data.playlist.slice(index)
      })
    }
    // 设置激活变量
    const activeName = ref('发现音乐')
    return {
      defaultList,
      mySongList,
      mycollectList,
      activeName
    }
  }
}
</script>

<style scoped lang="less">

.asidenav{
  margin-left: 15px;
  background-color: #fff;
  font-size: 13px;
  .musiclist{
    margin: 2px 5px 0 0 ;
    display: block;
    height: 35px;
    line-height: 35px;
    padding-right: 3px;
      width: 95%;

    a{
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      i{
        padding: 0 5px;
        font-size: 20px;
      }
    }
    &:hover{
        background-color: #eee;
      }
  }
  .title{
    position: relative;
    font-size: 13px;
    color: #ccc;
    height: 35px;
    line-height: 35px;
    >i{
      display: inline-block;
      font-size: 3px;
    }
    span{
      position: absolute;
      top: 0;
      right: 15px;
      display: inline-block;
      font-size: 25px;
    }
  }
}
.active{
  font-size: 15px;
  font-weight: 600;
  margin: 2px 5px 0 0 ;

}
</style>
