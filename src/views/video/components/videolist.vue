<template>
  <div class="videolist-container">
    <WyySortBtn
    :hotSort="hotSort"
    :allSort="allSort"
    name='全部'
    :visible="visible"
    @clickBtn='clickBtn'
    @change-sort='changeSort'
    />
    <div class="body">
      <ul v-if="videolist">
        <li v-for="item in videolist" :key="item.data.vid">
          <WyyVideo
          :img='item.data.coverUrl'
          :title='item.data.title'
          :nickname='"by "+item.data.creator.nickname'
          />
        </li>
      </ul>
      <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
    </div>
  </div>
</template>

<script>
import { getVideoCatgoryList, getVideoGroupList, getVideoGroup, getVideoTimelineAll } from '@/api/video.js'
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
    // 控制面板的打开关闭
    const clickBtn = (status) => {
      visible.value = !status
      console.log(visible.value)
      // 判断之前是否发送过请求
      if (allSort.value.length === 0) {
        getVideoGroupList().then(res => {
          allSort.value.push(res.data)
        })
      }
    }
    // 发送请求变量
    const id = ref(null)
    const offset = ref(0)
    // 无限加载变量
    const loading = ref(false)
    const finished = ref(false)
    // 接受数据变量
    const videolist = ref([])
    // 获取选择的id
    const changeSort = (name) => {
      console.log(name)
      if (name === '全部') {
        id.value = null
        offset.value = 0
      } else {
        allSort.value.forEach(item => {
          const list = item.find(data => {
            return data.name === name
          })
          id.value = list.id
          offset.value = 0
        })
      }
      videolist.value = []
    }
    // 进行无限加载

    const getData = () => {
      loading.value = true
      if (id.value) {
        getVideoGroup(id.value, offset.value).then(res => {
          if (res.datas.length) {
            videolist.value.push(...res.datas)
            offset.value += 8
          } else {
            finished.value = true
            loading.value = true
          }
          loading.value = false
        })
      } else {
        console.log(offset.value)
        getVideoTimelineAll(offset.value).then(res => {
          if (res.datas.length) {
            videolist.value.push(...res.datas)
            offset.value += 8
          } else {
            finished.value = true
            loading.value = true
          }
          loading.value = false
        })
      }
    }
    return {
      hotSort,
      clickBtn,
      allSort,
      visible,
      changeSort,
      loading,
      finished,
      getData,
      videolist
    }
  }
}
</script>

<style lang="less" scoped>
.videolist-container{
  padding: 10px 80px ;
  .body{
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
}
:deep(.panel){
      .title{
        flex: none !important;
      }
    }
</style>
