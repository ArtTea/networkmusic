<template>
<el-scrollbar >
  <div class="SingerListDetail-container">
    <div class="singerdetail-title" v-if="singerDetail">
      <div class="left">
        <img :src="singerDetail.cover+'?param=200y200'" alt="">
      </div>
      <div class="right">
        <div class="name">{{singerDetail.name}}</div>
        <div class="subname"></div>
        <div class="btn">
          <span class="subscribe">
            <i class="iconfont icon-24gl-folderPlus"></i>
            收藏
          </span>
          <span class="home">
            <i class="iconfont icon-gerenzhongxin"></i>
            个人主业
          </span>
        </div>
        <div class="count">
          <span >单曲数：{{singerDetail.musicSize}}</span>
          <span >专辑数：{{singerDetail.albumSize}}</span>
          <span >MV数：{{singerDetail.mvSize}}</span>
        </div>
      </div>
    </div>
  <!-- 歌曲导航条 -->
    <ul class="nav">
      <li @click="activeName='album'" :class="{active:activeName==='album'}">专辑</li>
      <li @click="activeName='MV'" :class="{active:activeName==='MV'}">MV</li>
      <li @click="activeName='singerdesc'" :class="{active:activeName==='singerdesc'}" >歌手详情</li>
    </ul>
    <div class="body"  >
      <div v-if="activeName==='album'" class="album" >
        <WyyAlbum :picUrl="require('@/assets/images/topSongsLogo.png')" :songList='songTopList'>热门五十首</WyyAlbum>
        <WyyAlbum :picUrl="item[0].al.picUrl" :songList='item'  v-for="item in singerAlbumInfo" :key="item.id">{{item[0].al.name}}</WyyAlbum>
        <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
      </div>
      <div v-if="activeName==='MV'" class="MV">
      </div>
      <div v-if="activeName==='singerdesc'" class="singerdesc">
        <SingerDesc/>
      </div>
    </div>
  </div>
</el-scrollbar>
</template>

<script>
import SingerDesc from './components/singerdesc.vue'
import { reactive, ref } from 'vue'
import { getSingerTopSong, getSingerAlbum, getSingerAlbumInfo, getSingerDetail } from '@/api/singer.js'
import { useRoute } from 'vue-router'
export default {
  name: 'SingerListDetail',
  components: {
    SingerDesc
  },
  setup () {
    // 声明控制导航条的变量
    const activeName = ref('album')
    const route = useRoute()
    const singerDetail = ref(null)
    // 获取歌手详细信息
    getSingerDetail(route.params.id).then(res => {
      singerDetail.value = res.data.artist
      // console.log(res.data.artist)
    })

    // 声明热门50首变量
    const songTopList = ref(null)
    getSingerTopSong(route.params.id).then(data => {
      songTopList.value = data.songs.slice(0, 10)
      // console.log(data.songs)
    })
    // 声明获取歌手专辑id的变量
    const SingerAlbumfrom = reactive({
      id: route.params.id,
      limit: 5,
      offset: 0
    })
    // 声明获取歌手专辑的变量
    const singerAlbum = ref([])
    // 声明获取歌手专辑详细信息的变量
    const singerAlbumInfo = ref([])
    // 无限加载歌手专辑
    const loading = ref(false)
    const finished = ref(false)
    const getData = () => {
    // 请求专辑
      getSingerAlbum(SingerAlbumfrom).then(data => {
        if (data.hotAlbums.length) {
          singerAlbum.value.push(data.hotAlbums)
          // 遍历请求的专辑
          data.hotAlbums.forEach(item => {
            // 根据专辑的id发送请求获取专辑的详细信息
            getSingerAlbumInfo(item.id).then(data => {
              singerAlbumInfo.value.push(data.songs)
            })
          })
          SingerAlbumfrom.offset += SingerAlbumfrom.limit
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    return {
      activeName,
      singerDetail,
      songTopList,
      loading,
      finished,
      getData,
      singerAlbum,
      singerAlbumInfo
    }
  }
}
</script>

<style lang="less" scoped>
.SingerListDetail-container{
  padding: 30px;
  .singerdetail-title{
    display: flex;

    .left{
      width: 175px;
      img{
        width: 100%;
        border-radius:10px ;
      }
    }
    .right{
      padding-left: 20px;
      .name{
        font-size: 25px;
        font-weight: 600;
      }
      .subname{
        padding-top: 10px;
        font-size: 14px;
      }
      .btn{
        .subscribe,.home{
          margin-right: 10px;
          display: inline-block;
          padding: 6px 20px;
          text-align: center;
          vertical-align: middle;
          border: 1px solid #ccc;
          border-radius: 20px;
          i{
            color: #333;
            font-weight: 600;

          }
        }
      }
      .count{
        padding-top:20px ;
        font-size: 12px;
        span{
          padding: 0 15px;
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
