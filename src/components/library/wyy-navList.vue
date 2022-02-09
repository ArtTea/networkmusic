<template>
  <div class="menu" >
    <!-- 遍历导航条 -->
    <ul>
     <li
     @click="activeIndex=i"
     :class="{active:activeIndex===i}"
     v-for="(item,i) in musicNavList"
     :key="item.id">
     <RouterLink :to="item.path">{{item.name}}</RouterLink>
     </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'WyyNavList',
  props: {
    musicNavList: {
      type: Array,
      default: () => []
    }

  },
  setup () {
    const activeIndex = ref(0)
    return {
      activeIndex
    }
  }
}
</script>

<style lang="less" scoped>
.menu{
  display: flex;
  padding: 20px 0px;
  li{
    display: inline-block;
    padding: 0 20px;
    height:30px;
    line-height: 30px;
  }
  .active{
    font-weight: 600;
    font-size: 25px;
    color: #000;
  }
}
</style>
