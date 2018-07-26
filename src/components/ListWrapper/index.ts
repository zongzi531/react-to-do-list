import { Component, createElement as e } from 'react'
import Input from '../Input'
import ColorBtn from '../ColorBtn'
import HelpNote from '../HelpNote'
import NavTabs from '../NavTabs'
import ToDoList from '../ToDoList'
import { MINUSONE, ONE, NULLSTRING, LABELTODOS, LABELHAVEDOS, HELPNOTE } from '../../config'
import { IToDoList } from '../../interfaces'

interface IListWrapperState {
  inputText: string
  editInputText: string
  nowIndex: number
  keyFlag: number
  color: string
  todos: IToDoList[]
  havedos: IToDoList[]
  todoflag: boolean
  havedoflag: boolean
}

export default class ListWrapper extends Component<{}, IListWrapperState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      inputText: NULLSTRING,
      editInputText: NULLSTRING,
      nowIndex: MINUSONE,
      keyFlag: 0,
      color: 'default',
      todos: [],
      havedos: [],
      todoflag: true,
      havedoflag: false
    }
  }

  public handleInputChange = (inputText: string) => {
    this.setState({
      inputText
    })
  }

  public handleListInputChange = (editInputText: string) => {
    this.setState({
      editInputText
    })
  }

  public addTodos = () => {
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
        keyFlag: this.state.keyFlag + ONE,
        inputText: NULLSTRING
      })
    }
  }

  public editTodos = () => {
    const text = this.state.editInputText.trim()
    if (text) {
      const { todos } = this.state
      todos[this.state.nowIndex].text = text
      this.setState({
        todos,
        editInputText: NULLSTRING,
        nowIndex: MINUSONE
      })
    }
  }

  public haveDo = (index: number) => {
    const { todos } = this.state
    const { havedos } = this.state
    const content = todos[index]
    havedos.push(content)
    todos.splice(index, ONE)
    this.setState({
      todos,
      havedos,
      nowIndex: MINUSONE
    })
  }

  public unDo = (index: number) => {
    const { todos } = this.state
    const { havedos } = this.state
    const content = havedos[index]
    todos.push(content)
    havedos.splice(index, ONE)
    this.setState({
      todos,
      havedos
    })
  }

  public removeTodo = (index: number) => {
    const { todos } = this.state
    todos.splice(index, ONE)
    this.setState({
      todos
    })
  }

  public removeUndo = (index: number) => {
    const { havedos } = this.state
    havedos.splice(index, ONE)
    this.setState({
      havedos
    })
  }

  public changeTodos = (index: number) => {
    this.setState({
      nowIndex: index,
      editInputText: this.state.todos[index].text
    })
  }

  public cancelChange = () => {
    this.setState({
      nowIndex: MINUSONE
    })
  }

  public selectColor = (color: string) => {
    this.setState({
      color
    })
  }

  public reverseTodo = () => {
    this.setState({
      todoflag: !this.state.todoflag
    })
  }

  public reverseUndo = () => {
    this.setState({
      havedoflag: !this.state.havedoflag
    })
  }

  public render () {
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
      e(HelpNote, { text: HELPNOTE }),
      e(
        NavTabs,
        {
          tabsTitle: LABELTODOS,
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
          list: this.state.todos
        }
      ),
      e(
        NavTabs,
        {
          tabsTitle: LABELHAVEDOS,
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
