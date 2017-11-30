import { Component, createElement as e } from 'react'
import Input from '../Input'
import ColorBtn from '../ColorBtn'
import HelpNote from '../HelpNote'
import NavTabs from '../NavTabs'
import ToDoList from '../ToDoList'

class ListWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputText: '',
      editInputText: '',
      nowIndex: -1,
      keyFlag: 0,
      color: 'default',
      todos: [],
      havedos: [],
      todoflag: true,
      havedoflag : false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleListInputChange = this.handleListInputChange.bind(this)
    this.addTodos = this.addTodos.bind(this)
    this.haveDo = this.haveDo.bind(this)
    this.unDo = this.unDo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.removeUndo = this.removeUndo.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.reverseTodo = this.reverseTodo.bind(this)
    this.reverseUndo = this.reverseUndo.bind(this)
  }

  handleInputChange (inputText) {
    this.setState({
      inputText
    })
  }

  handleListInputChange (editInputText) {
    this.setState({
      editInputText
    })
  }

  addTodos () {
    let text = this.state.inputText.trim()
    if (text) {
      let todos = this.state.todos
      let key = `${this.state.color}${this.state.keyFlag}`
      let content = {
        color: this.state.color,
        text,
        key
      }
      todos.push(content)
      this.setState({
        todos,
        keyFlag: this.state.keyFlag + 1,
        inputText: ''
      })
    }
  }

  haveDo (index) {
    let todos = this.state.todos
    let havedos = this.state.havedos
    let content = todos[index]
    havedos.push(content)
    todos.splice(index, 1)
    this.setState({
      todos,
      havedos
    })
  }

  unDo (index) {
    let todos = this.state.todos
    let havedos = this.state.havedos
    let content = havedos[index]
    todos.push(content)
    havedos.splice(index, 1)
    this.setState({
      todos,
      havedos
    })
  }

  removeTodo (index) {
    let todos = this.state.todos
    todos.splice(index, 1)
    this.setState({
      todos
    })
  }

  removeUndo (index) {
    let havedos = this.state.havedos
    havedos.splice(index, 1)
    this.setState({
      havedos
    })
  }

  selectColor (color) {
    this.setState({
      color
    })
  }

  reverseTodo () {
    this.setState({
      todoflag: !this.state.todoflag
    })
  }

  reverseUndo () {
    this.setState({
      havedoflag: !this.state.havedoflag
    })
  }

  render () {
    return e(
      'div',
      {
        className: 'list-wrapper'
      },
      e(
        Input,
        {
          inputText: this.state.inputText,
          onInputChange: this.handleInputChange,
          onClick: this.addTodos
        }
      ),
      e(
        ColorBtn,
        {
          onClick: this.selectColor
        }
      ),
      e(HelpNote),
      e(
        NavTabs,
        {
          tabsTitle: '未完成',
          tabsClass: !this.state.todos.length || !this.state.todoflag,
          counts: this.state.todos.length,
          onClick: this.reverseTodo
        }
      ),
      e(
        ToDoList,
        {
          undo: true,
          listDisplay: this.state.todoflag,
          nowIndex: this.state.nowIndex,
          onInputChange: this.handleListInputChange,
          removeClick: this.removeTodo,
          haveClick: this.haveDo,
          list: this.state.todos
        }
      ),
      e(
        NavTabs,
        {
          tabsTitle: '已完成',
          tabsClass: !this.state.havedos.length || !this.state.havedoflag,
          counts: this.state.havedos.length,
          onClick: this.reverseUndo
        }
      ),
      e(
        ToDoList,
        {
          undo: false,
          listDisplay: this.state.havedoflag,
          removeClick: this.removeUndo,
          haveClick: this.unDo,
          list: this.state.havedos
        }
      )
    )
  }
}

export default ListWrapper
