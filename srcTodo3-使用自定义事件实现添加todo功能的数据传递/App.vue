<!--
  1、全部使用props传递数据的todo版本，进一步优化数据在本地的存储localStorage
  2、使用自定义事件实现添加todo的功能，实现子组件给父组件传递数据，自定义事件绑定有两种方式：
    （1）父组件给子组件标签：通过v-on绑定，如: v-on:addTodo='addTodo'/ @addTodo = 'addTodo'
    （2）父组件调用$on('事件名',callback）方法，注意在绑定事件时必须在mounted中绑定，不能在
        created中绑定，因为在声明周期中created到mounted中间会有一个模版编译的过程，因为这是通
        过父组件来给子组件绑定事件的，所以在模版编译之前，即created中是读不到子组件标签的，就会报错，
        所以必须绑定在模版编译之后的mounted中才能读到标签
    子组件触发自定义事件：$emit('事件名'，data)
 -->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<todoHeader :addTodo="addTodo"/>-->
      <!-- 绑定自定义事件方式一：给子组件标签绑定自定义事件addTodo -->
      <!--<todoHeader @addTodo="addTodo"/>-->
      <!-- 绑定自定义事件方式二：调用$on在mounted中绑定，但是要做个标识，是给header标签绑定的 -->
      <todoHeader ref="header"/>
      <todoMain :todos="todos" :deleteTodo="deleteTodo"/>
      <todoFooter :todos="todos" :selectAll="selectAll" :deleteCompleted="deleteCompleted"/>
    </div>
  </div>
</template>

<script>
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
        // 过滤产生新的数组并更新
        this.todos = this.todos.filter(todo => !todo.completed)
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
