<template>
  <div><h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <!--<li><a aria-current="true" href="/home/news" class="activeClass">News</a></li>-->
        <!--<li><a aria-current="false" href="/home/message">Message</a></li>-->
        <!-- 使用路由链接标签写链接 -->
        <li>
          <router-link to="/home/news">News</router-link>
        </li>
        <li>
          <router-link to="/home/message">Message</router-link>
        </li>
      </ul>
      <div>
        <!-- 使用路由视图显示当前路由组件 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default{}
</script>

<style>

</style>
