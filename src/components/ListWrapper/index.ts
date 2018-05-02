import { Component, createElement as e } from 'react'
import Input from '../Input'
import ColorBtn from '../ColorBtn'
import HelpNote from '../HelpNote'
import NavTabs from '../NavTabs'
import ToDoList from '../ToDoList'

interface Itodos {
  text: string
}

interface IListWrapperState {
  inputText: string
  editInputText: string
  nowIndex: number
  keyFlag: number
  color: string
  todos: Itodos[]
  havedos: Itodos[]
  todoflag: boolean
  havedoflag: boolean
}

export default class ListWrapper extends Component<{}, IListWrapperState> {
  constructor(props: any) {
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
      havedoflag: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleListInputChange = this.handleListInputChange.bind(this)
    this.addTodos = this.addTodos.bind(this)
    this.editTodos = this.editTodos.bind(this)
    this.haveDo = this.haveDo.bind(this)
    this.unDo = this.unDo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.removeUndo = this.removeUndo.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.reverseTodo = this.reverseTodo.bind(this)
    this.reverseUndo = this.reverseUndo.bind(this)
    this.changeTodos = this.changeTodos.bind(this)
    this.cancelChange = this.cancelChange.bind(this)
    this.moveItem = this.moveItem.bind(this)
    this.moveItemExchange = this.moveItemExchange.bind(this)
  }

  public handleInputChange(inputText: string) {
    this.setState({
      inputText
    })
  }

  public handleListInputChange(editInputText: string) {
    this.setState({
      editInputText
    })
  }

  public addTodos() {
    const text = this.state.inputText.trim()
    if (text) {
      const { todos } = this.state
      const key = `${this.state.color}${this.state.keyFlag}`
      const content = {
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

  public editTodos() {
    const text = this.state.editInputText.trim()
    if (text) {
      const { todos } = this.state
      todos[this.state.nowIndex].text = text
      this.setState({
        todos,
        editInputText: '',
        nowIndex: -1
      })
    }
  }

  public haveDo(index: number) {
    const { todos } = this.state
    const { havedos } = this.state
    const content = todos[index]
    havedos.push(content)
    todos.splice(index, 1)
    this.setState({
      todos,
      havedos,
      nowIndex: -1
    })
  }

  public unDo(index: number) {
    const { todos } = this.state
    const { havedos } = this.state
    const content = havedos[index]
    todos.push(content)
    havedos.splice(index, 1)
    this.setState({
      todos,
      havedos
    })
  }

  public removeTodo(index: number) {
    const { todos } = this.state
    todos.splice(index, 1)
    this.setState({
      todos
    })
  }

  public removeUndo(index: number) {
    const { havedos } = this.state
    havedos.splice(index, 1)
    this.setState({
      havedos
    })
  }

  public changeTodos(index: number) {
    this.setState({
      nowIndex: index,
      editInputText: this.state.todos[index].text
    })
  }

  public cancelChange() {
    this.setState({
      nowIndex: -1
    })
  }

  public selectColor(color: any) {
    this.setState({
      color
    })
  }

  public reverseTodo() {
    this.setState({
      todoflag: !this.state.todoflag
    })
  }

  public reverseUndo() {
    this.setState({
      havedoflag: !this.state.havedoflag
    })
  }

  public moveItem({ dragItem, dragIndex }: any, { dropItem, dropIndex }: any, undo: any) {
    const todos = undo ? this.state.todos : this.state.havedos

    todos[dragIndex] = dropItem
    todos[dropIndex] = dragItem

    this.moveItemExchange(undo, todos)
  }

  public moveItemExchange(undo: any, todos: any) {
    if (undo) {
      this.setState({
        todos
      })
    } else {
      this.setState({
        havedos: todos
      })
    }
  }

  public render() {
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
          onClick: this.addTodos,
          onKeyUp: this.addTodos
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
          changeListText: this.changeTodos,
          editInputText: this.state.editInputText,
          onKeyUp: this.editTodos,
          onBlur: this.cancelChange,
          list: this.state.todos,
          moveItem: this.moveItem
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
          list: this.state.havedos,
          moveItem: this.moveItem
        }
      )
    )
  }
}
