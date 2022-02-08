<template>
    <div class="recommend">
      <!-- 轮播图 -->
        <WyyCarousel :bannerList='bannerList'/>
        <WyyPanel>
          <template #panelheader>
            <span>推荐歌单</span>
            <i class="iconfont icon-angle-right "></i>
          </template>
          <template #panelbody>
            <WyyItem :List="recommendList" @clickWyyItem='clickWyyItem'/>m>
          </template>
        </WyyPanel>
      </div>
</template>

<script>
import { getBanner, getPersonalized } from '@/api/discover.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Recommend',
  setup () {
    // 获取轮播图数据
    const bannerList = ref(null)
    getBanner().then(data => {
      bannerList.value = data.banners
    })
    // 获取推荐歌单数据
    const recommendList = ref(null)
    getPersonalized().then(data => {
      recommendList.value = data.result
      console.log(data.result)
    })
    const router = useRouter()
    const clickWyyItem = (id) => {
      router.push(`/musiclistdetail/${id}`)
    }
    return {
      clickWyyItem,
      bannerList,
      recommendList
    }
  }
}
</script>

<style scoped lang='less'>

.recommend{
  span{
    font-size: 20px;
  }
}

</style>
