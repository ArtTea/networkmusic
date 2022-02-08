<template>
  <div class="singer-container">
     <!-- 歌手分类选择 -->
      <div class="selectors">
        <!-- 语种分类 -->
          <div class="selectorItem">
            <span class="title">语种:</span>
            <div class="sort-container">
              <span @click="checkedSort.area=item.area" class="btn" v-for="item in languageSort" :key="item.area" :class="{active:item.area===checkedSort.area}" >{{item.name}}</span>
            </div>
          </div>
          <!-- 歌手分类 -->
          <div class="selectorItem">
            <span class="title">分类:</span>
            <div class="sort-container">
              <span @click="checkedSort.type=item.type" class="btn" v-for="item in typeSort" :key="item.type" :class="{active:item.type===checkedSort.type}" >{{item.name}}</span>
            </div>
          </div>
          <!-- 筛选分类 -->
          <div class=" selectorItem">
              <span class="title">筛选:</span>
            <div class="sort-container">
              <span @click="checkedSort.initial=item.initial" class="btn" v-for="item in initialSort" :key="item.initial" :class="{active:item.initial===checkedSort.initial}" >{{item.name}}</span>
            </div>
          </div>
      </div>
      <div class="singer-body">
         <ul v-if="singerlist">
          <WyyItem :List="singerlist" @clickWyyItem='clickWyyItem'/>
        </ul>
        <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
      </div>
  </div>
</template>

<script>
import { reactive, watch, ref, computed } from 'vue'
import { getSingerList } from '@/api/discover.js'
import { useRouter } from 'vue-router'
export default {
  name: 'Singer',
  setup () {
  // 创建筛选分类的静态数据
    const languageSort = reactive([
      { area: -1, name: '全部' },
      { area: 7, name: '华语' },
      { area: 96, name: '欧美' },
      { area: 8, name: '日本' },
      { area: 16, name: '韩国' },
      { area: 0, name: '其它' }
    ])
    const typeSort = reactive([
      { type: -1, name: '全部' },
      { type: 1, name: '男歌手' },
      { type: 2, name: '女歌手' },
      { type: 3, name: '乐队' }
    ])
    const initialSort = reactive([
      { initial: -1, name: '热门' },
      { initial: 'a', name: 'A' },
      { initial: 'b', name: 'B' },
      { initial: 'c', name: 'C' },
      { initial: 'd', name: 'D' },
      { initial: 'e', name: 'E' },
      { initial: 'f', name: 'F' },
      { initial: 'g', name: 'G' },
      { initial: 'h', name: 'H' },
      { initial: 'i', name: 'I' },
      { initial: 'j', name: 'J' },
      { initial: 'k', name: 'K' },
      { initial: 'l', name: 'L' },
      { initial: 'm', name: 'M' },
      { initial: 'n', name: 'N' },
      { initial: 'o', name: 'O' },
      { initial: 'p', name: 'P' },
      { initial: 'q', name: 'Q' },
      { initial: 'r', name: 'R' },
      { initial: 's', name: 'S' },
      { initial: 't', name: 'T' },
      { initial: 'u', name: 'U' },
      { initial: 'v', name: 'V' },
      { initial: 'w', name: 'W' },
      { initial: 'x', name: 'X' },
      { initial: 'y', name: 'Y' },
      { initial: 'z', name: 'Z' },
      { initial: 0, name: '#' }
    ])
    const checkedSort = reactive({
      // 语种
      area: -1,
      // 分类
      type: -1,
      // 筛选
      initial: -1,
      // 分页
      offset: 0,
      // 一页几条
      limit: 30
    })

    // 声明歌手列表变量
    const singerlist = ref([])
    //  进行无限加载
    const loading = ref(false)
    const finished = ref(false)
    const getData = () => {
      loading.value = true
      getSingerList(checkedSort).then(data => {
        if (data.artists.length) {
          singerlist.value.push(...data.artists)
          checkedSort.offset += checkedSort.limit
          // palyList.offset = 50 * (currentPage.value - 1)
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    const changesingerdata = computed(() => {
      const { area, type, initial } = checkedSort
      return { area, type, initial }
    })
    watch(changesingerdata, () => {
      // getSingerList(newVal).then(data => {
      //   singerlist.value = data.artists
      // })
      singerlist.value = []
      checkedSort.offset = 0
      finished.value = false
    }, { immediate: true })

    const router = useRouter()
    const clickWyyItem = (id) => {
      router.push(`/singerdetail/${id}`)
    }
    return {
      languageSort,
      typeSort,
      initialSort,
      checkedSort,
      singerlist,
      loading,
      finished,
      getData,
      clickWyyItem
    }
  }
}
</script>

<style lang="less" scoped>
.singer-container{
  padding: 0 80px;
  .selectorItem{
    position: relative;
    .title{
      position: absolute;
      display: inline-block;;
      width: 40px;
      height: 30px;
      line-height: 30px;
    }
    .sort-container{
      display: inline-block;
      padding-left:40px ;
    }
    .btn{
      display: inline-block;
      margin-left: 5px;
      height: 30px;
      width: 67px;
      text-align: center;
      padding: 6px 12px;
      margin-bottom:5px ;
    }
    .active{
      color: #ec4747;
      background-color: #fdf5f5;
      border-radius: 20px;
    }
  }
  .singer-body{
    padding-top: 30px;
  }
}

</style>
