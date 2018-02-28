<template>
  <div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Router Basic - 01</h2></div>
      </div>
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
         <!-- <a class="list-group-item" aria-current="false" href="/about">About</a>
          <a class="list-group-item activeClass" aria-current="true" href="/home">Home</a>-->
          <!--使用路由链接标签，实现路由跳转-->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6">
          <div class="panel">
            <div class="panel-body">
              <!-- 路由视图: router-view 显示当前路由组件 ,注意可以通过它给当前的组件传递数据
              即Home/About组件就可以读取它传递的数据，其他组件不可以-->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{}
</script>

<style>

</style>
