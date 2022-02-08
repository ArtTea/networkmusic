<template>
<ul class="Subscribers-container" v-if="subscriberUser">
  <li v-for=" item in subscriberUser" :key="item.userId">
    <div class="images">
      <img v-lazy="item.avatarUrl+'?param=200y200'" alt="">
    </div>
    <div class=" body">
      <div class="username">{{item.nickname}}</div>
      <div class="introduction">{{item.signature}}</div>
    </div>
  </li>
</ul>
  <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />

</template>

<script>
import { getPlaylistSubscribers } from '@/api/playlist.js'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
export default {
  name: 'Subscribers',
  setup () {
    const route = useRoute()
    const SubscriberPage = reactive({
      id: route.params.id,
      limit: 21,
      offset: 0
    })
    const subscriberUser = ref([])

    //  进行无限加载
    const loading = ref(false)
    const finished = ref(false)
    // 判断是否进行无限加载
    const getData = () => {
      getPlaylistSubscribers(SubscriberPage).then(data => {
        if (data.subscribers.length) {
          subscriberUser.value.push(...data.subscribers)
          SubscriberPage.offset += SubscriberPage.limit
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    console.log(subscriberUser.value)

    return {
      getData,
      finished,
      loading,
      subscriberUser
    }
  }
}
</script>

<style lang="less" scoped>
.Subscribers-container{
  font-size: 13px;
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  li{
    display: flex;
    width: 33.3%;
    height: 80px;
    margin-bottom: 10px;
    .images{
        width: 75px;
      img{
        width: 100%;
        border-radius:50px ;
      }
    }
    .body{
      padding: 15px 5px;
      height: 80px;
      .introduction{
        width: 230px;
        padding-top:15px ;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
