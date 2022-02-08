<template>
 <div class="comment-container" >
    <el-input
    type="textarea"
    placeholder="请输入内容"
    :autosize="{ minRows: 3, maxRows: 4}"
    v-model="pushOrDeletel.content"
    maxlength="140"
    show-word-limit

  >
  </el-input>
  <span  @click="commentuser" class=" fr pushBtn">评论</span>
  <!-- 精彩评论区 -->
  <WyyPanel v-if="songListHotComment" >
    <template #panelheader>
      精彩评论
    </template>
    <template #panelbody>
      <WyyComment :comments="songListHotComment" />
    </template>
  </WyyPanel>
  <!-- 最新评论区 -->
  <WyyPanel v-if="songListNewComment" >
    <template #panelheader>
      最新评论({{total}})
    </template>
    <template #panelbody>
      <WyyComment :comments="songListNewComment" @getuserId='getuserId' @getscrollTop='getscrollTop'/>
      <WyyInfiniteLoading :loading="loading" :finished="finished" @infinte='getData' />
    </template>
  </WyyPanel>
 </div>

</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCommentPlaylist } from '@/api/playlist.js'
import { pushOrDeleteComment } from '@/api/comment.js'
import { ElMessage } from 'element-plus'
export default {
  name: 'Comment',
  setup () {
    const route = useRoute()
    // 声明歌单最新评价的变量
    const songListNewComment = ref([])
    // 声明歌单热门评价的变量
    const songListHotComment = ref([])
    // 总评价
    const total = ref(0)
    //  进行无限加载
    const loading = ref(false)
    const finished = ref(false)
    const commentPage = reactive({
      id: route.params.id,
      // 分页
      offset: 0,
      // 一页几条
      limit: 20
    })
    // 进行评论的无限加载
    const getData = () => {
      getCommentPlaylist(commentPage).then(data => {
        total.value = data.total
        if (data.comments.length) {
          songListNewComment.value.push(...data.comments)
          songListHotComment.value = data.hotComments
          commentPage.offset += commentPage.limit
        } else {
          finished.value = true
          loading.value = true
        }
        loading.value = false
      })
    }
    // 发送评价或者回复评价
    const pushOrDeletel = reactive({
      // 1 发送, 2 回复
      t: 1,
      // 回复资源类型
      type: 2,
      // 对应资源 id
      id: route.params.id,
      // 要发送的内容
      content: '',
      // :回复的评论 id (回复评论时必填)
      commentId: ''
    })
    const commentuser = () => {
      pushOrDeletel.content = ''
      pushOrDeleteComment(pushOrDeletel).then(data => {
        if (data.code === 200) {
          ElMessage.success({
            message: '评论成功',
            type: 'success'
          })
        }
      })
    }

    const getuserId = (id, name) => {
      pushOrDeletel.commentId = id
      pushOrDeletel.content = `回复${name}:`
    }

    const getscrollTop = (el) => {
      const reply = el
      console.log(reply)
    }
    return {
      songListNewComment,
      songListHotComment,
      total,
      loading,
      finished,
      getData,
      pushOrDeletel,
      commentuser,
      getuserId,
      getscrollTop
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.el-textarea__inner):focus{
  border-color:#DCDFE6 ;
}
.pushBtn{
  display: inline-block;
  margin-top: 15px;
  height: 30px;
  padding: 3px 13px;
  border: 1px solid #ccc;
  border-radius:15px ;
  &:hover{
    background-color: #f4f4f4;
  }
}
</style>
