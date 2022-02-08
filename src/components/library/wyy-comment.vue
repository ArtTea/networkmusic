<template>
  <div class="comment-container">
    <div class="rowItem" v-for="item in comments" :key="item.commentId">
      <div class="avatar">
        <img v-lazy="item.user.avatarUrl+'?param=200y200'" :alt="item.user.nickname">
      </div>
      <div class="body">
        <div class="comment">
          <RouterLink to="/">{{item.user.nickname}} : </RouterLink>
          <span>{{item.content}}</span>
        </div>
        <div class="reply" v-if="item.beReplied.length>0">
          <RouterLink to="/">@{{item.beReplied[0].user.nickname}} : </RouterLink>
          <span>{{item.beReplied[0].content}}</span>
        </div>
        <div class="fl timer">{{item.timeStr}}</div>
        <div class="fr features">
          <span class="like">
            <i class="iconfont icon-31dianzan"></i>
            {{item.likedCount}}
          </span>
          <span class="share">
            <i class="iconfont icon-fenxiang1"></i>
          </span>
          <span class="replybtn" @click="reply(item.user.userId,item.user.nickname)">
            <i class="iconfont icon-kuaisuhuifu"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WyyComment',
  props: {
    comments: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    // 把回复的id和昵称发送给父组件
    const reply = (id, name) => {
      emit('getuserId', id, name)
      const replybtn = document.querySelector('.replybtn')
      emit('getscrollTop', replybtn)
    }

    return {
      reply
    }
  }
}
</script>

<style lang="less" scoped>
.rowItem{
  display: flex;
  padding: 15px 0 20px;
  border-bottom:1px solid #eee ;
  .avatar{
    width: 50px;
    margin-right:10px ;
    img{
      width: 100%;
      border-radius:50% ;
    }
  }
  .body{
    flex: 1;
    .comment{
      font-size: 12px;
      margin-top: 5px;
      >a{
        color: #767DAF;
      }
    }
    .reply{
      margin: 3px 0;
      padding: 7px;
      font-size: 12px;
      background-color: #f4f4f4;
      border-radius:5px ;
       >a{
        color: #767DAF;
      }
    }
    .timer{
      color: #ccc;
      margin-top:5px ;
    }
    .features{
      span{
        padding: 0 10px;
        color: #ccc;
        .iconfont{
          font-size: 20px;
        }
      }
    }
  }
}

</style>
