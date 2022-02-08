<template>
<el-scrollbar>
  <div class="musiclistdetail" v-if="detailList">
      <div class="header">
        <div class="cover">
          <img :src="detailList.coverImgUrl" alt="">
        </div>
        <div class="introduction">
        <!-- 榜单名称 -->
          <div class="row">
            <span class="titlesub">歌单</span>
            <span class="title">{{detailList.name}}</span>
          </div>
          <!-- 榜单的创建者及创建时间  -->
          <div class="row">
              <img :src="detailList.creator.avatarUrl" alt="" class="avatar">
              <span class="username">{{detailList.creator.nickname}}</span>
              <span class="creationtime">{{getcreateTime(detailList.createTime)}} 创建</span>
          </div>
          <!-- 榜单按钮 -->
          <div class="row">
            <span class="fl allplay">
              <span class="left">
                <i class="iconfont icon-arrow_right_fat"></i>
                播放全部
                </span>
              <span class="right">+</span>
            </span>
            <span class="fl collect">
              <i class="iconfont icon-wodeshoucang"></i>
              收藏
            </span>
            <span class="fl share">
              <i class="iconfont icon-fenxiang"></i>
                分享
            </span>
          </div>
          <!-- 榜单标签 -->
          <div class="row" v-if="detailList.tags">
            标签：
            <span class="label" v-for="(item, index) in detailList.tags" :key="index">{{item}}</span>
          </div>
          <!-- 榜单歌曲及播放数量 -->
          <div class="row">
            <span class="songsnumber">歌曲：{{detailList.tracks.length}}</span>
            <span class="palynumber">播放：{{handpalycount(detailList.playCount)}}<span v-if="detailList.playCount>10000">万</span></span>
          </div>
          <!-- 榜单简介 -->
          <div class="row">
            <span class="Introduction">简介：{{detailList.description}}</span>
          </div>
        </div>
      </div>
          <!-- 歌曲导航条 -->
        <ul class="nav">
          <li @click="activeName='songlist'" :class="{active:activeName==='songlist'}">歌曲列表</li>
          <li @click="activeName='discuss'" :class="{active:activeName==='discuss'}">评论({{detailList.commentCount}})</li>
          <li @click="activeName='collect'" :class="{active:activeName==='collect'}" >收藏者</li>
        </ul>
      <div class="body"  >
        <div v-if="activeName==='songlist'" class="songlist" >
          <WyyList :isvisible="true" :list="detailList"/>
        </div>
        <div v-if="activeName==='discuss'" class="discuss">
          <Comment/>
        </div>
        <div v-if="activeName==='collect'" class="collect">
          <Subscribers/>
        </div>
      </div>
  </div>
</el-scrollbar>

</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPlaylistDetail } from '@/api/playlist.js'
import { getcreateTime, handpalycount } from '@/hooks/'
import Comment from './components/comment.vue'
import Subscribers from './components/subscribers.vue'
// import { useStore } from 'vuex'
export default {
  name: 'musiclistdetail',
  components: {
    Comment,
    Subscribers
  },
  setup () {
    const activeName = ref('songlist')
    const route = useRoute()
    const detailList = ref(null)
    // const store = useStore()
    watch(() => route.params.id, (newVal) => {
      getPlaylistDetail(newVal).then(data => {
        activeName.value = ''
        detailList.value = data.playlist
        // store.commit('user/setUserCurrSongList', data.playlist.tracks)
        // store.commit('user/setUserCurrSongListId', data.playlist.id)
        setTimeout(() => {
          activeName.value = 'songlist'
        }, 0)
      })
    }, { immediate: true })

    return {
      activeName,
      detailList,
      getcreateTime,
      handpalycount

    }
  }
}
</script>

<style lang="less" scoped>
.musiclistdetail{
  padding: 30px;
  // height: calc( 100vh - 140px);
  .header{
    display: flex;
    .cover{
      img{
        width: 200px;
        border-radius: 10px;
      }
    }
    .introduction{
      padding-left:20px ;
      flex: 1;
      .row{
        padding-bottom: 8px;
        overflow: hidden;
        font-size: 12px;
        // 榜单的创建者及创建时间
        .titlesub{
          font-size: 10px;
          color: #EC4141;
          padding: 0 2px;
          border: 1px solid #EC4141;
          border-radius: 2px;
        }
        .title{
          font-size: 25px;
          font-weight: 600;
          padding-left: 9px;
        }
        // 榜单的创建者及创建时间
        .avatar{
          width: 40px;
          border-radius: 20px;
        }
        .username{
          padding-left:10px ;
          color: #6191c2;
          cursor: pointer;
        }
        .creationtime{
          padding-left:10px ;
          font-size: 8px;
        }
        // 榜单按钮
        .allplay{
          margin-right: 10px;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          color: #fff;
          background-color: #EC4141;
          .left{
            .icon-arrow_right_fat{
              font-size: 17px;
            }
            border-radius: 20px 0 0 20px;
            float: left;
            width: 120px;
            height: 40px;
            line-height: 40px;
            &:hover{
              background-color: #d13c3c;
            }
          }
          .right{
            border-radius:0 20px  20px 0;
            border-left: 0.5px solid #f77777;
            float: right;
            width: 40px;
            font-size: 25px;
             &:hover{
              background-color: #d13c3c;
            }
          }
        }
        .collect,.share{
          margin-right: 10px;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          text-align: center;
          vertical-align: middle;
          width: 90px;
          border: 1px solid #ccc;
          border-radius: 20px;
          .icon-wodeshoucang{
            display: inline-block;
            height: 40px;
            line-height: 40px;
          }
        }
        .palynumber{
          padding-left:10px ;
          font-size: 8px;
        }
        .label{
          padding-right:5px ;
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

// 穿透列表更改样式
  :deep(.list-container){
    .hot{
      width: 0;
      padding: 0;
      overflow: hidden;
    }
  }
}

</style>
