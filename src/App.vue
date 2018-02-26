<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoHeader :addTodo="addTodo"/>
      <todoMain :todos="todos" :deleteTodo="deleteTodo"/>
      <todoFooter :todos="todos" :selectAll="selectAll" :deleteCompleted="deleteCompleted"/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'
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
       todos: JSON.parse(window.localStorage.getItem('todo_key') || '[]')
     }
    },
    methods:{
      // 1、添加todo事项
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
        handler: function(newValue){ // newValue是最新的todos
          // 将todos保存到localStorage (注意todos是JSON格式的数据)
          window.localStorage.setItem('todo_key',JSON.stringify(newValue))
        }
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
