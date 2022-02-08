<template>
<div v-for="(item,i) in singerintroduction" :key="i">
  <div class="title">{{item.ti}}</div>
  <div class="body">{{item.txt}}</div>
</div>

</template>

<script>
import { getSingerDesc } from '@/api/singer.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'SingerDesc',
  setup () {
    const route = useRoute()
    const singerintroduction = ref(null)
    // 获取歌手描述
    getSingerDesc(route.params.id).then(data => {
      singerintroduction.value = data.introduction
      console.log(data.introduction)
    })
    return {
      singerintroduction
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 15px;
  font-weight: 600;
  margin: 10px 0;
}
.body{
  white-space: pre-line;
  line-height: 30px;
  color: #333;
}
</style>
