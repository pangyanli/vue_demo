<!--
  1、全部使用props传递数据的todo版本，进一步优化数据在本地的存储localStorage
    vue组件之间的通信方式有5种：props/自定义事件/pubsub（消息订阅与发布）/slot/vuex
  2、使用自定义事件实现添加todo的功能，实现子组件给父组件传递数据，自定义事件绑定有两种方式：
    （1）父组件给子组件标签：通过v-on绑定，如: v-on:addTodo='addTodo'/ @addTodo = 'addTodo'
    （2）父组件调用$on('事件名',callback）方法，注意在绑定事件时必须在mounted中绑定，不能在
        created中绑定，因为在声明周期中created到mounted中间会有一个模版编译的过程，因为这是通
        过父组件来给子组件绑定事件的，所以在模版编译之前，即created中是读不到子组件标签的，就会报错，
        所以必须绑定在模版编译之后的mounted中才能读到标签
    子组件触发自定义事件：$emit('事件名'，data)
  3、使用PubSub(消息订阅与发布)来实现案例的删除todo功能的父组件给后代组件传递数据
    父组件：订阅消息，相当于绑定事件，PubSub.subscribe('消息名'，callback)
    子组件：发布消息，相当于触发事件，PubSub.publish('消息名'，data)
    注意：使用pubsub对组件/组件与组件之间的通信没有要求，使用时要下载PubSub第三库
      npm install pubsub-js --save ，然后在当前组件内引入，才能使用
  4、使用插槽发布内容（slot）方法实现父组件传递给子组件，对Item和App进行修改
    子组件：声明使用插槽占位，如：<slot name="count"></slot>，传过来什么就显示什么
    父组件：给子组件传递带数据的标签，插入到占位，注意标识名要一样
     <span slot="count">已完成{{completedCount}}/ 全部 {{todos.length}}</span>
 -->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<todoHeader :addTodo="addTodo"/>-->
      <!-- 绑定自定义事件方式一：给子组件标签绑定自定义事件addTodo -->
      <!--<todoHeader @addTodo="addTodo"/>-->
      <!-- 绑定自定义事件方式二：调用$on在mounted中绑定，但是要做个标识，是给header标签绑定的 -->
      <todoHeader ref="header"/>
      <!--<todoMain :todos="todos" :deleteTodo="deleteTodo"/>-->
      <!-- 使用pubsub订阅消息，完成App与Item之间的通信，实现删除todo的功能 -->
      <todoMain :todos="todos"/>
      <!-- 使用slot查曹操分发内容的方式给子组件传递带数据的标签 -->
      <todoFooter :todos="todos" :selectAll="selectAll" :deleteCompleted="deleteCompleted">
        <input type="checkbox" v-model="allCompleted" slot="selectAll"/>
        <span slot="count">已完成{{completedCount}}/ 全部 {{todos.length}}</span>
        <button class="btn btn-danger" v-show="completedCount>0"
                @click="deleteCompleted" slot="deleteCompleted">清除已完成任务</button>
      </todoFooter>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'
  import localStorageUtil from './utils/localStorageUtil'

  export default{
    data(){
     /* return {
        todos: [
          {title:'吃饭', completed: false},
          {title:'睡觉', completed: true},
          {title:'敲代码', completed: false}
        ]
      }*/
     // 利用本地缓存存储数据，当刷新或者关闭浏览器再打开时，还能看到原来的数据
     return {
       // 从本地缓存localStorage中获取数据，如果没有就显示空数组，注意是字符串
     //  todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
       // 从localStorage中读取保存todos数据
       todos: localStorageUtil.readTodos()
     }
    },

   /* created(){ // 是在模版编译之前，找不到标签，报错，所以不能在这里绑定
      this.$refs.header.$on('addTodo',this.addTodo)
    },*/
    // 自定义事件绑定方式二
    mounted(){ // 是在模版编译之后，可以找到标签
      // 因为this是父组件，但是是要给子组件Header绑定的，所以要加标识ref找到子组件
      this.$refs.header.$on('addTodo',this.addTodo)

      // 订阅消息（deleteTodo）,也可以在created中执行该代码
      PubSub.subscribe('deleteTodo',(msg,index) => {
        this.deleteTodo(index)
      })
    },
    computed: {
      //3、已完成事项 ，计算闭关返回一个结果
      completedCount(){
        return this.todos.reduce((preTodo, todo) => preTodo + (todo.completed ? 1 : 0 ),0)
      },
      // 是否全选或全不选
      allCompleted:{  // allCompleted 是boolean值
        get(){
          return this.completedCount === this.todos.length && this.todos.length > 0
        },
        set(value){ // value 是boolean类型
          // 对所有todos进行全选或者全不选
          this.selectAll(value)
        }
      }
    },
    methods:{
      // 1、添加todo事项回调函数
      addTodo(todo){
        this.todos.unshift(todo)
      },
      // 2、删除列表中的todo事项
      deleteTodo(index){
        this.todos.splice(index,1)
      },
      // 3、全选或者全不选
      selectAll(check){  // check是boolean值
        // 更新所有的todo的completed
       this.todos.forEach(todo => todo.completed = check)
      },
      // 4、删除已完成的todo事项
      deleteCompleted(){
        if(window.confirm(`确定要清除选已完成的todo吗？`)){
          // 过滤产生新的数组并更新
          this.todos = this.todos.filter(todo => !todo.completed)
        }
      }
    },
    // 实现利用localStorage本地缓存数据，必须要深度监视数据
    watch: {
      todos:{
        deep: true, // 深度监视
     /*   handler: function(newValue){ // newValue是最新的todos
          // 将todos保存到localStorage (注意todos是JSON格式的数据)
          window.localStorage.setItem('todo_key',JSON.stringify(newValue))
        }*/
        handler: localStorageUtil.saveTodos
      }
    },
    components: {  // 将组件映射成标签，因为Header这些都是关键字，所以不要直接使用
      todoHeader: Header,
      todoMain: Main,
      todoFooter: Footer,
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
