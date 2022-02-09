<template>
<div class="videoItem" >
  <div class="index"><slot/></div>
  <div class="images">
    <img :src="img+'?param=400y250'" alt="">
    <div></div>
    <div></div>
  </div>
  <div class="title">
    <div class="name">{{title}}</div>
    <div class="subname" v-if="nickname" ><span >{{nickname}}</span></div>
    <div class="subname" v-if="artists" >
      <span class="1" v-for="item in artists" :key="item.name">{{item.name}}/</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'WyyVideo',
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    artists: {
      type: Array,
      default: () => []
    },
    play: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.videoItem{
  padding-bottom: 15px;
  height: 100%;
  .images{
    img{
      width: 100%;
      height: 100%;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .title{
    width: 100%;
    font-size: 12px;
    margin-top: 10px;
    .name{
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subname{
      color: #ccc;
      font-size: 10px;
       white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
