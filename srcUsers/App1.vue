<!-- 发送ajax请求的两种方法：axios和VueResource -->
<template>
  <div>
    <!-- 没有仓库名时显示loading-->
    <p v-if="!repoName">Loading...</p>
    <p v-else>most star repo is <a :href=" repoUrl">{{repoName}}</a></p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return {
        repoName: '',
        repoUrl: '',
        searchName: 'vue'
      }
    },
    mounted(){
      const url = `https://api.github.com/search/repositories?q=${searchName}&sort=starts`
      // 使用vue-resource发送ajax请求异步获取数据
      /*this.$http.get(url)
        .then(
          response => {  //成功
            //得到响应数据
            const result = response.data
            //得到仓库对象
            const repo = result.items[0]
            //更新数据
            this.repoName = repo.name
            this.repoUrl = repo.html_url
          },
          response => {  //失败
            console.log('error', response.statusText)
            alert('请求失败')
          }
        )*/
      //使用axios发送ajax请求
      axios.get(url)
        .then(
          response => {
            //得到响应数据
            const result = response.data
            // 得到仓库对象
            const repo = result.items[0]
            // 更新数据
            this. repoName = repo.name
            this.repoUrl = repo.html_url
          }
        )
        .catch(
          error => {
            alert(error.message)
          }
        )
    }
  }
</script>

<style>

</style>
