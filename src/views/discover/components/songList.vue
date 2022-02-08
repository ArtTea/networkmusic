<template>
  <div class="songList-contaner">
        <WyySortBtn
        :hotSort="hotSort"
        :allcategories="allcategories"
        :allSort="allSort"
        name='华语'
        :visible="visible"
        @clickBtn='clickBtn'
        @change-sort="changeSort"/>
      <div class="list-body" v-if="palyListInfo" >
        <WyyItem :List="palyListInfo" @clickWyyItem='clickWyyItem'/>
      </div>
        <!-- 分页 -->
      <div class="page" v-if="palyListInfo">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size='palyList.limit'
            :total="pagetotal"
            :current-page="currentPage"
            @current-change='changpage'
            >
          </el-pagination>
      </div>
  </div>

</template>
<script>

import { getHotSort, getAllSort, getTopPlayList } from '@/api/discover.js'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'SongList',
  setup () {
    // 获取热门分类歌单数据
    const hotSort = ref(null)
    getHotSort().then(data => {
      hotSort.value = data.tags
    })
    // 获取大分类歌单数据
    const allcategories = ref([])
    // 获取小分类歌单数据
    const allSort = ref([])
    // 控制面板开关
    const visible = ref(null)
    const clickBtn = (status) => {
      visible.value = !status
      console.log(visible.value)
      console.log(allcategories.value)
      if (allcategories.value.length === 0) {
        getAllSort().then(data => {
          // 获取Object获取categories的值
          allcategories.value = Object.values(data.categories)
          // 获取Object获取allcategories的长度
          for (let i = 0; i < Object.keys(allcategories.value).length; i++) {
            // 通过滤方法筛选小分类的值
            allSort.value[i] = data.sub.filter(item => {
              return item.category === i
            })
          }
          console.log(allSort.value[1])
        })
      }
    }

    // 获取当前分页的页数
    const currentPage = ref(1)
    // 分类详情列表歌单
    const palyList = reactive({
      cat: '华语',
      limit: 50,
      offset: 0
    })
    // 把请求分类歌单列表封装成函数方便调用
    const getSortInfoList = (palyList) => {
      palyList.offset = 50 * (currentPage.value - 1)
      // 清空所有数据使得滚动条返回顶部
      palyListInfo.value = ''
      getTopPlayList(palyList).then(data => {
        palyListInfo.value = data.playlists
        pagetotal.value = data.total
      })
    }
    // 得到选中分类的详情数据
    const palyListInfo = ref(null)
    // 获取选中分类的总条目数
    const pagetotal = ref(null)
    // 监听分类发生变化
    const changeSort = (name) => {
      palyList.cat = name
      palyList.offset = 1
      getSortInfoList(palyList)
    }

    // 分页发生改变的时候出触发
    const changpage = (page) => {
      currentPage.value = page
      palyList.offset = currentPage.value
      getSortInfoList(palyList)
    }
    const router = useRouter()
    const clickWyyItem = (id) => {
      router.push(`/musiclistdetail/${id}`)
    }
    return {
      hotSort,
      allcategories,
      allSort,
      palyList,
      palyListInfo,
      changeSort,
      pagetotal,
      currentPage,
      changpage,
      clickWyyItem,
      clickBtn,
      visible
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  height: 50px;
  text-align:center;
}
</style>
