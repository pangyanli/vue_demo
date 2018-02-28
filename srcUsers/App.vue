<!-- 搜索用户案例的App -->
<template>
  <div class="container">
  <Search />
  <UserMain />
  </div>
</template>

<script>
  import axios from 'axios'
  import Search from './components/Search.vue'
  import Main from './components/Main.vue'
  export default{
    components:{  // 将组件映射成标签
      Search,
      UserMain: Main  // 因为main是关键字，所以不能直接使用
    }
  }
</script>

<style>

</style>
