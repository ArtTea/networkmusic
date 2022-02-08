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
  name: 'Video',
  setup () {
    // nav列表的静态数据
    const musicNavList = [
      { id: 0, name: '视频', path: '/video/videolist' },
      { id: 1, name: 'MV', path: '/video/mvlist' }
    ]
    return {
      musicNavList
    }
  }

}
</script>

<style>

</style>
