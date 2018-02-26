<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
    <!-- 3、使用组件标签 -->
      <Add :addComment="addComment"/>
      <List :comments="comments" :deleteComment="deleteComment"/>
    </div>
  </div>
</template>

<script>
 /* 1、引入组件 */
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default{
    data(){
     /* return {
        comments: [
          {name: '张三', content: 'vue so easy!'},
          {name: '李四', content: 'vue so hard!'},
          {name: '王五', content: 'vue just so so!'}
        ]
      }*/
     /* 利用localStorage本地缓存，存储comments，即使关闭浏览器，再打开时，还是显示原来的数据 */
     return { // 注意要将数据转换成json格式，即字符串
       // // 从localStorage中读取保存comments数据
       comments: JSON.parse(window.localStorage.getItem('comment_key') || '[]')
     }
    },
    methods: {
      // 1、添加评论功能
      addComment(comment){
        this.comments.unshift(comment)
      },
      // 2、删除评论功能
      deleteComment(index){
        this.comments.splice(index, 1)
      }
    },
    // 深度监视comments并保存到localStorage本地缓存中
    watch: {
      comments: {
        deep: true, // 深度监视
        handler: function(newVlue){ // newVlue 是最新的comments
          // 将最新的comments并保存到localStorage本地缓存中，注意必须转换成JSON格式
          window.localStorage.setItem('comment_key',JSON.stringify(newVlue))
        }
      }
    },
    components: { // 2、将组件映射成标签
      Add,
      List
    }
  }
</script>

<style>

</style>
