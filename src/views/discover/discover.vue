<template>
<el-scrollbar  >
  <div class="discover-container">
    <!-- nav导航列表 -->
    <WyyNavList :musicNavList='musicNavList'/>
    <RouterView/>
  </div>
</el-scrollbar >
</template>

<script>
export default {
  name: 'discover',
  setup () {
    // nav列表的静态数据
    const musicNavList = [
      { id: 0, name: '个性推荐', path: '/discover/recommend' },
      { id: 1, name: '专属定制', path: '/' },
      { id: 2, name: '歌单', path: '/discover/songlist' },
      { id: 3, name: '排行榜', path: '/discover/ranking' },
      { id: 4, name: '歌手', path: '/discover/singer' },
      { id: 5, name: '最新音乐', path: '/' }
    ]
    return {
      musicNavList
    }
  }
}
</script>

<style lang="less" scoped>
.discover-container{
  // height: calc( 100vh - 140px);
  width: 100%;
  padding:0 50px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  span,.icon-angle-right{
    font-size: 20px;
    line-height: 40px;
  }
}
</style>
