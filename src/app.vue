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
      <Add />
      <List />
    </div>
  </div>
</template>

<script>
 /* 1、引入组件 */
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default{
    components: { // 2、将组件映射成标签
      Add,
      List
    }
  }
</script>

<style>

</style>
