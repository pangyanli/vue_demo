<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoHeader :addTodo="addTodo"/>
      <todoMain :todos="todos" :deleteTodo="deleteTodo"/>
      <todoFooter :todos="todos" />
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'
  export default{
    data(){
      return {
        todos: [
          {title:'吃饭', completed: false},
          {title:'睡觉', completed: true},
          {title:'敲代码', completed: false}
        ]
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
