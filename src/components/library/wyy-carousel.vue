<template>
<!-- 轮播图 -->
 <div class="container" v-if="bannerList">
    <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in bannerList" :key="item">
      <img :src="item.imageUrl" :alt="item.typeTitle">
    </el-carousel-item>
  </el-carousel>
 </div>
</template>

<script>
export default {
  name: 'WyyCarousel',
  props: {
    bannerList: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  width: 1000px;
  .el-carousel__item{
    background-color: none;
    border-radius: 10px;
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  img{
    display:block;
    width: 500px;
    height: 200px;
  }
}
</style>
