<template>
<ul class="radio-container" >
  <li v-for="item in radio" :key="item.id" class="radioItem">
    <div class="images">
      <img :src="item.picUrl+'?param=400y400'" alt="">
    </div>
    <div class="radioname">
        <span class="title">{{item.name}}</span>
        <span class="label">{{item.category}}</span>
    </div>
    <div class="author">by {{item.dj.nickname}}</div>
    <div class="name">声音{{item.programCount}}</div>
  </li>
</ul>
</template>

<script>
export default {
  name: 'WyyRadio',
  props: {
    radio: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.radio-container{
  .radioItem{
    display: flex;
    align-items: center;
    height: 90px;
    &:nth-child(2n){
      background-color: #fff;
    }
    &:nth-child(2n+1){
      background-color:#F9F9F9 ;
    }
    .images{
      width: 110px;
      img{
      width: 90px;
      border-radius:14px ;
      overflow: hidden;
      padding: 7px;
    }
    }
    .radioname{
      display: flex;
      flex: 4;
      vertical-align:middle;
      .title{
        display:inline-block;
        font-size: 16px ;
      }
      .label{
        display:inline-block;
        color: #EC4141;
        border: 1px solid #EC4141;
        height: 18.8px;
        padding:0 3px;
        margin: auto ;
        margin-left:30px ;
      }
    }
    .author,.name{
      flex: 1;
      color: #ccc;
    }

  }

}

</style>
