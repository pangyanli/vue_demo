/*
 数据存储的工具模版
 向外暴露对象还是函数？就看有几个功能（1个就暴露函数）
 */
const TODOS_KEY = 'todos_key'
export default {
  // 读取保存的todos
  readTodos(){
    return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
  },
  // 保存指定的todos
  saveTodos(todos){
    window.localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
  }
}
