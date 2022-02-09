<template>
  <div class="list-container" v-if="list">
    <table>
      <thead  v-if="isvisible">
        <tr class="listRow">
          <td class="index"></td>
          <td class="hot">热度</td>
          <td class="download">操作</td>
          <td class="musictitle">标题</td>
          <td class="singer">歌手</td>
          <td class="album">专辑</td>
          <td class="timer">时长</td>
        </tr>
      </thead>
      <tbody>
        <tr @click="checked(item.id)" @dblclick="playing(item.id)" :class="{active:activeName===item.id}" class="listRow" v-for="(item,i) in newlist" :key="item.id">

          <td  class="index">
            <span v-if="isplay===item.id" class="isplay">
            <i class="iconfont icon-yinlianglabashengyin"></i>
            </span>
            <span v-else>{{i+1}}</span>
          </td>
          <!-- <td class="hot" v-if="list.trackIds[i].ratio"><span >{{list.trackIds[i].ratio +"%"}}</span></td> -->
          <td class="download">
            <i class="iconfont icon-aixin1"></i>
            <i class="iconfont icon-xiazai2"></i>
          </td>
          <td class="musictitle">{{item.name}}<span class="subtitle">{{item.alia[0]}}</span></td>
          <td class="singer">{{item.ar[0].name}}</td>
          <td class="album" >{{item.al.name}}</td>
          <td class="timer">{{handleMusicTime(item.dt)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { handleMusicTime } from '@/hooks'
import { useStore } from 'vuex'
export default {
  name: 'WyyList',
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: () => ({})
    }

  },
  setup (props) {
    const store = useStore()
    const newlist = ref({})
    const isplay = ref(null)
    if (props.isvisible) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      newlist.value = props.list.tracks
    } else {
      // eslint-disable-next-line vue/no-setup-props-destructure
      newlist.value = props.list.tracks.slice(0, 5)
    }
    const activeName = ref('')
    const checked = (id) => {
      activeName.value = id
    }
    // 鼠标双击传递当前音乐的id
    const playing = (id) => {
      activeName.value = id
      isplay.value = id
      console.log(isplay.value)
      store.commit('user/setMusicId', id)
      store.commit('user/setPalyStatus', true)
    }
    return {
      newlist,
      handleMusicTime,
      activeName,
      playing,
      checked,
      isplay
    }
  }
}
</script>

<style lang="less" scoped>
.isplay{
  i{
    color: #EC4141 ;
  }
}
.subtitle{
  color: #ccc;
  font-size: 12px;
  padding-left: 5px;
}
.active{
    background-color: #F0F1F2 !important;
  }
table{
  width: 100%;
  tr:nth-child( 2n){
    background-color: #fff;
  }
  tr:nth-child(2n+1){
    background-color:#F9F9F9 ;
  }
  tr:hover{
    background-color: #F0F1F2;
  }

  td{
    padding: 0 5px;

  }
  thead{
    .listRow{
      color: #ccc;
      font-size: 12px;
    }
  }
  .listRow{
    display: flex;
    height:35px;
    line-height: 35px;
    font-size: 13px;
    color: #666;
    max-width: 1280px;
    .index{
      width: 30px;;
      padding-left: 10px;
      color: #ccc;
      font-size: 12px;
    }
    .download{
      width: 50px;
      text-align: center;
      .iconfont{
        padding: 0 2px;
        color: #ccc;
        font-size: 16px;
      }
    }
    .musictitle{
      flex:16 ;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .singer{
      flex:8 ;
    }
    .album{
      flex:8 ;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .timer{
     width: 100px;
    }
  }
}
</style>
