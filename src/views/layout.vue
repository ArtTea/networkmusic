<template>
<!-- 顶部导航栏 -->
 <div class="home-page">
  <div class="header">
    <TopNav/>
  </div>
  <!-- 侧边导航栏 -->
  <div class="homg-container" >
    <div class="aside" >
      <AsideNav/>
    </div>
    <!-- 主体内容区 -->
    <div class="main">
    <RouterView  />
    </div>
  </div>
    <div class="footer">
      <Music/>
    </div>
</div>
</template>
<script>
import TopNav from '@/components/pc-topnav.vue'
import AsideNav from '@/components/pc-asidenav.vue'
import Music from '@/components/pc-music.vue'
export default {

  name: 'Layout',
  components: {
    TopNav,
    AsideNav,
    Music
  },
  setup () {
  }
}
</script>

<style lang="less" scoped>
.home-page{
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 1200px;
    .header{
      height: 60px;
      padding: 0%;
    }
  .homg-container{
    flex: 1;
    display: flex;
    .aside{
      flex: 1;
      height: calc(100vh - 140px);
      min-width: 220px;
      border-right : 1px solid #E0E0E0;

    }
    .main{
      flex: 11;
      padding: 0;
      overflow: hidden;
      height: calc( 100vh - 140px);
    }
  }
    .footer{
      height: 80px;
      background-color: #fff;
      overflow: hidden;
      bottom: 0;
      padding: 0;
    }
  }

</style>
