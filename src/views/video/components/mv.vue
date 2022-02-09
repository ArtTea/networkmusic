<template>

<div class="mv-container">
  <div class="MvItem">
    <div class="nav">
      <WyyMvSort @changeSort="changeMvfirst" :sortlist='area'>
        <RouterLink to="/video/mv/mvlist">
          最新MV
          <i class="iconfont icon-xiangyoujiantou"></i>
        </RouterLink>
      </WyyMvSort>
    </div>
    <ul v-if="Mvfirstlist">
      <li v-for="item in Mvfirstlist" :key="item.id">
        <WyyVideo
        :img='item.cover'
        :title='item.name'
        :artists='item.artists'
        />
      </li>
    </ul>
  </div>
  <div class="MvItem">
    <div class="nav">
      <div class="title">
        <RouterLink to="/video/mv/mvlist">
          热播MV
          <i class="iconfont icon-xiangyoujiantou"></i>
        </RouterLink>
      </div>
    </div>
    <ul v-if="MvHotlist">
      <li v-for="item in MvHotlist" :key="item.id">
        <WyyVideo
        :img='item.cover'
        :title='item.name'
        :artists='item.artists'
        />
      </li>
    </ul>
  </div>
  <div class="MvItem">
    <div class="nav">
      <div class="title">
        <RouterLink to="/video/mv/mvlist">
          网易出品
          <i class="iconfont icon-xiangyoujiantou"></i>
        </RouterLink>
      </div>
    </div>
    <ul v-if="MvOfficiallist">
      <li v-for="item in MvOfficiallist" :key="item.id">
        <WyyVideo
        :img='item.cover'
        :title='item.name'
        :artists='item.artists'
        />
      </li>
    </ul>
  </div>
  <div class="TopMV">
    <div class="MvItem">
    <div class="nav">
      <div class="nav">
        <WyyMvSort @changeSort="changeTopMv" :sortlist='area'>MV排行榜</WyyMvSort>
      </div>
    </div>
    <ul v-if="TopMvllist">
      <li v-for="(item,i) in TopMvllist" :key="item.id">
        <WyyVideo
        :img='item.cover'
        :title='item.name'
        :artists='item.artists'
        >{{i+1>9?i+1:'0'+(i+1)}}</WyyVideo>
      </li>
    </ul>
  </div>
  </div>
</div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { getMvFirst, getMvAll, getMvExclusiveRcmd, getTopMv } from '@/api/video.js'
export default {
  name: 'Mv',
  setup () {
    // 创建筛选分类的静态数据
    const area = reactive([
      { name: '内地' },
      { name: '港台' },
      { name: '欧美' },
      { name: '韩国' },
      { name: '日本' }
    ])
    // 获取最新的MV资源
    const Mvfirstfrom = reactive({
      area: '',
      limit: 8
    })
    // 监听最新MV的变动
    const Mvfirstlist = ref(null)
    watch(Mvfirstfrom, () => {
      getMvFirst(Mvfirstfrom).then(res => {
        Mvfirstlist.value = res.data
        console.log(Mvfirstlist.value)
      })
    }, { immediate: true })
    // 获取改变的信息
    const changeMvfirst = (area) => {
      Mvfirstfrom.area = area
    }
    // 获取最热的MV资源
    const MvHotfrom = reactive({
      area: '',
      order: '最热',
      limit: 8
    })
    // 监听最热MV的变动
    const MvHotlist = ref(null)
    watch(MvHotfrom, () => {
      getMvAll(MvHotfrom).then(res => {
        console.log(res.data)
        MvHotlist.value = res.data
      })
    }, { immediate: true })

    // 获取最热的MV资源
    const MvOfficialfrom = reactive({
      offset: 0,
      limit: 8
    })
    // 监听官方MV的变动
    const MvOfficiallist = ref(null)
    watch(MvOfficialfrom, () => {
      getMvExclusiveRcmd(MvOfficialfrom).then(res => {
        console.log(res.data)
        MvOfficiallist.value = res.data
      })
    }, { immediate: true })

    // 获取MV排行榜信息
    const TopMvfrom = reactive({
      area: '',
      offset: 0,
      limit: 10
    })
    // 监听MV排行榜的变动
    const TopMvllist = ref(null)
    watch(TopMvfrom, () => {
      getTopMv(TopMvfrom).then(res => {
        console.log(res.data)
        TopMvllist.value = res.data
      })
    }, { immediate: true })
    // 获取改变的信息
    const changeTopMv = (area) => {
      TopMvfrom.area = area
    }
    return {
      area,
      Mvfirstlist,
      MvHotlist,
      MvOfficiallist,
      TopMvllist,
      changeMvfirst,
      changeTopMv
    }
  }
}
</script>

<style lang="less" scoped>
.mv-container{
  padding: 0 80px ;
  .MvItem{
    margin-top:15px ;
    .nav{
      overflow: hidden;
      padding-bottom: 10px;
      .title{
        font-weight: 600;
        font-size: 14px;
        i{
          font-size: 14px;
        }
      }
    }
    ul{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
      width: 100%;
      li{
        width: 24%;
      }
    }
  }
  .TopMV{
    ul{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
      width: 100%;
      li{
        width: 50%;
        padding-top: 20px;
        border-right: 1px solid #eee ;
        border-bottom: 1px solid #eee ;
        &:nth-child(2n){
        border-right: none ;

        }
        :deep(.videoItem){
          display: flex;
          .index{
            width: 40px;
            font-size: 18px;
            color: #ccc;
            text-align: center;
            line-height: 100px;
          }
          .images{
           width: 170px;
          }
          .title{
            margin:0 20px;
            width: 100px;;
            flex: 4;
          }
        }
      }
    }
  }
}
</style>
