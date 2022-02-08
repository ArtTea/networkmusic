<template>
  <div class="videolist-container">
    <WyySortBtn
    :hotSort="hotSort"
    :allSort="allSort"
    name='翻唱'
    :visible="visible"
    @clickBtn='clickBtn'
    />

  </div>
</template>

<script>
import { getVideoCatgoryList, getVideoGroupList } from '@/api/video.js'
import { ref } from 'vue'
export default {
  name: 'Videolist',
  setup () {
    // 获取热门分类
    const hotSort = ref(null)
    const allSort = ref([])
    getVideoCatgoryList().then(res => {
      hotSort.value = res.data
      console.log(res.data)
    })
    const visible = ref(false)
    const clickBtn = (status) => {
      visible.value = !status
      console.log(visible.value)

      if (allSort.value.length === 0) {
        getVideoGroupList().then(res => {
          allSort.value.push(res.data)
        })
      }
    }

    return {
      hotSort,
      clickBtn,
      allSort,
      visible
    }
  }
}
</script>

<style lang="less" scoped>
.videolist-container{
  padding: 30px;

}
:deep(.panel){
      .title{
        flex: none !important;
      }
    }
</style>
