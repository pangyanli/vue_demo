<template>
  <div class="todo-footer">
    <label>
      <!--<input type="checkbox" v-model="allCompleted"/>-->
      <!-- 声明使用插槽分发内容slot实现通信，并占位 -->
      <slot name="selectAll">如果没有其他组件传递内容过来，该文本就会被显示，所以可以不写</slot>
    </label>
    <span>
          <!--<span>已完成{{completedCount}}/ 全部 {{todos.length}}</span> -->
      <slot name="count"></slot>
    </span>
    <!--<button class="btn btn-danger" v-show="completedCount>0" @click="clearTodo">清除已完成任务</button>-->
    <slot name="deleteCompleted"></slot>
  </div>
</template>

<script>
  export default{
/*    props: {
      todos: Array,
      selectAll: Function,
      deleteCompleted: Function
    },*/
    /*computed: {
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
    },*/
   /* methods: {
      clearTodo(){
        if(window.confirm(`确定要清除选已完成的todo吗？`)){
          this.deleteCompleted()
        }
      }
    }*/
  }
</script>

<style>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
