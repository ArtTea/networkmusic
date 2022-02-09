<template>
<el-scrollbar >
  <div class="mvlist-container">
    <div class="mvlist-title">全部MV</div>
    <div class="mvlist-body">
      <WyyMvSort  @changeSort="changeArea" name='全部' :sortlist='area'>地区：</WyyMvSort>
      <WyyMvSort  @changeSort="changeType" name='全部' :sortlist='type'>类型：</WyyMvSort>
      <WyyMvSort  @changeSort="changeOrder" name='上升最快' :sortlist='order'>排序：</WyyMvSort>
      <ul v-if="allMVSortList">
        <li v-for="item in allMVSortList" :key="item.id">
          <WyyVideo
          :img='item.cover'
          :title='item.name'
          :artists='item.artists'
          ></WyyVideo>
        </li>
      </ul>
      <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
    </div>
  </div>
</el-scrollbar >
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { getMvAll } from '@/api/video.js'
export default {
  name: 'mvlist',
  setup () {
    // 创建筛选地区的静态数据
    const area = reactive([
      { name: '全部' },
      { name: '内地' },
      { name: '港台' },
      { name: '欧美' },
      { name: '韩国' },
      { name: '日本' }
    ])
    // 创建筛选类型的静态数据
    const type = reactive([
      { name: '全部' },
      { name: '官方版' },
      { name: '原声' },
      { name: '现场版' },
      { name: '网易出品' }
    ])
    // 创建筛选排序的静态数据
    const order = reactive([
      { name: '上升最快' },
      { name: '最热' },
      { name: '最新' }
    ])
    // 创建改变mv分类的变量
    const allMVSortFrom = reactive({
      area: '全部',
      type: '全部',
      order: '上升最快',
      limit: 20,
      offset: 0
    })
    // 判断地区值的变化
    const changeArea = (name) => {
      console.log(name)
      allMVSortFrom.area = name
    }
    // 判断类型值的变化
    const changeType = (name) => {
      console.log(name)
      allMVSortFrom.type = name
    }
    // 判断排序值的变化
    const changeOrder = (name) => {
      console.log(name)
      allMVSortFrom.order = name
    }
    // 声明接受数据的变量
    const allMVSortList = ref([])
    // 声明无限加载的变量
    const loading = ref(false)
    const finished = ref(false)
    const allMVSortFromData = computed(() => {
      const { area, type, order } = allMVSortFrom
      return { area, type, order }
    })
    // 监听要发生数据的变化
    watch(allMVSortFromData, () => {
      allMVSortList.value = []
      allMVSortFrom.offset = 0
    })
    // 判断是否进行无限加载
    const getData = () => {
      getMvAll(allMVSortFrom).then(res => {
        if (res.data.length) {
          allMVSortList.value.push(...res.data)
          allMVSortFrom.offset += allMVSortFrom.limit
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    return {
      area,
      type,
      order,
      allMVSortFrom,
      allMVSortList,
      changeArea,
      changeType,
      changeOrder,
      loading,
      finished,
      getData
    }
  }
}
</script>

<style lang="less" scoped>

.mvlist-container{
  padding: 20px;
  .mvlist-title{
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  .mvlist-body{
    padding: 0 70px;
    ul{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
      width: 100%;
      margin-top: 15px;
      li{
        width: 24%;
      }
    }
  }
  :deep(.nav){
    .title{
      font-weight: normal;
    }
    .stor{
      float: left;
    }
  }
}
</style>
