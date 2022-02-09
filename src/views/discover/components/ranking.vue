<template>
  <div class="ranking">
    <!-- 官方榜 -->
    <div class="official" v-if="toplistsong">
      <div class="title">官方榜</div>
        <div class="officialItem" v-for="(song,i) in toplistsong" :key="song.id" >
            <div class="itemCover">
              <img :src="toplistType[i].coverImgUrl" :alt="toplistType[i].description">
            </div>
            <div class="itemcontain">
              <WyyList :list="song" />
              <RouterLink :to="`/musiclistdetail/${song.id}`" class="viewAll">
                查看全部
              <i class="iconfont icon-qianjin1"></i>
              </RouterLink>

            </div>
        </div>
    </div>
    <div class="global" v-if="globalType">
      <div class="title">全球榜</div>
      <div class="globalItem">
        <WyyItem :List="globalType" @clickWyyItem='clickWyyItem'/>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllSongList } from '@/api/discover.js'
import { getPlaylistDetail } from '@/api/playlist.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Ranking',
  setup () {
    // 声明官方榜单数据变量
    const toplistType = ref([])
    // 声明个个官方榜单数据变量
    const toplistsong = ref([])
    // 声明全球榜单数据变量
    const globalType = ref([])
    // 请求全部歌单数据
    getAllSongList().then(data => {
      // 过滤出官方排行歌单并添加
      toplistType.value = data.list.filter(item => {
        return item.ToplistType
      })
      // 过滤出全球排行歌单并添加

      globalType.value = data.list.slice(Object.keys(toplistType.value).length)
      // console.log(data.list.slice(Object.keys(toplistType.value).length))
      console.log(globalType.value)
      // 遍历数据找出id发送请求详细歌单
      // for (let i = 0; i < Object.keys(toplistType.value).length; i++) {
      // }
      toplistType.value.forEach((item, i) => {
        getPlaylistDetail(item.id).then(data => {
          toplistsong.value.push(data.playlist)
        })
      })
    })
    const router = useRouter()
    const clickWyyItem = (id) => {
      router.push(`/musiclistdetail/${id}`)
    }
    return {
      toplistType,
      toplistsong,
      globalType,
      clickWyyItem
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  height: 60px;
  font-size: 20px;
  font-weight: 600;
}
.official{
  padding:  0 80px;
  .officialItem{
    display: flex;
      margin-bottom: 60px;

    .itemCover{
      width: 200px;
      img{
        width: 80%;
        border-radius: 10px;

      }
    }
    .itemcontain{
      flex: 4;
      .viewAll{
        display: block;
        padding-top: 5px;
        color: #ccc;
        font-size: 14px;
        i{
        font-size: 14px;
        }
      }
    }
  }
}

// 穿透list容器进行二次改造
:deep(.list-container){
  table{
    .download{
        width: 0;
        padding: 0;
        overflow: hidden;
    }
    .singer{
      padding-right: 15px;
      text-align: right;
      color: #ccc;
      font-size: 12px;
      flex: none;
    }
    .album{
      flex: 0;
      padding: 0;
      overflow: hidden;

    }
    .timer{
      flex: 0;
      padding: 0;
      overflow: hidden;
    }
  }

}
</style>
