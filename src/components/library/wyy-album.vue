<template>
<div class="wyyalbum">
  <div class="albumItem" >
      <div class="images">
        <img :src="picUrl+'?param=200y200'" alt="">
      </div>
      <div class="album-body">
        <div class="title"><slot/></div>
        <ul>
          <li
          @click="checked(item.id)"
          @dblclick="playing(item.id)"
          :class="{active:activeName===item.id}"
          class="row"
          v-for="(item,i) in songList"
          :key="item.id">
            <span class="index">{{i+1>9?i+1:'0'+(i+1)}}</span>
            <span class="operate">
              <i class="iconfont icon-aixin1"></i>
              <i class="iconfont icon-xiazai2"></i>
            </span>
            <span class="name">
              {{item.name}}
              <span v-if="item.alia[0]" class="subname">({{item.alia[0]}})</span>
              </span>
            <span class="fr time">{{handleMusicTime(item.dt)}}</span>
          </li>
        </ul>
      </div>
  </div>

</div>
</template>

<script>
import { handleMusicTime } from '@/hooks'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'WyyAlbum',
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    picUrl: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const store = useStore()

    const activeName = ref('')
    const checked = (id) => {
      activeName.value = id
      console.log(props.songList)
    }
    // 鼠标双击传递当前音乐的id
    const playing = (id) => {
      activeName.value = id
      store.commit('user/setMusicId', id)
      store.commit('user/setPalyStatus', true)
      store.commit('user/setUserCurrSongList', props.songList)
    }
    return {
      checked,
      playing,
      activeName,
      handleMusicTime
    }
  }

}
</script>

<style lang="less" scoped>
.active{
    background-color: #F0F1F2 !important;
}
.albumItem{
  display: flex;
  padding-bottom: 50px;
  .images{
    width: 200px;
    img{
      width: 150px;
      border-radius: 10px; ;
    }
  }
  .album-body{
    flex: 1;
    .title{
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
    }
    .row{
      width: 100%;
      height: 35px;
      line-height: 35px;
      color: #ccc;
      font-size: 13px;
      &:hover{
        background-color: #F0F1F2 !important;
      }
      span{
        display: inline-block;
      }
      .index{
        width: 40px;
        padding: 0 10px;
      }
      .operate{
        i{
          padding-right: 10px;
        }
      }
      .name{
        color: #333;
        .subname{
          color: #ccc;
          padding-left: 5px;
          font-size: 12px;
        }
      }
      .time{
        width: 120px;
      }
    }
    .row:nth-child( 2n){
    background-color: #fff;
    }
    .row:nth-child(2n+1){
      background-color:#F9F9F9 ;
    }
  }
}

</style>
