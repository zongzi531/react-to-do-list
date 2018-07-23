import { Component, createElement as e } from 'react'
import { Row, Col, notification, Input, Icon } from 'antd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Title from '../components/Title'
import ColorBtn from '../components/ColorBtn'
import NavTabs from '../components/NavTabs'
import ToDoList from '../components/ToDoList'
import { TITLE, AUTHOR, MINUSONE, ONE, NULLSTRING, LABELTODOS, LABELHAVEDOS, HELPNOTE } from '../config'
import { IToDoList, IDragObject, IDropObject } from '../interfaces'
import { post } from '../fetch'

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

class Home extends Component<{}, IListWrapperState> {
  constructor(props: {}) {
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

  public handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputText: event.target.value
    })
  }

  public handleListInputChange(editInputText: string) {
    this.setState({
      editInputText
    })
  }

  public addTodos(event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLSpanElement>) {
    if (event.keyCode === 13 || event.clientX) {
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
  }

  public editTodos() {
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

  public haveDo(index: number) {
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

  public unDo(index: number) {
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

  public removeTodo(index: number) {
    const { todos } = this.state
    todos.splice(index, ONE)
    this.setState({
      todos
    })
  }

  public removeUndo(index: number) {
    const { havedos } = this.state
    havedos.splice(index, ONE)
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
      nowIndex: MINUSONE
    })
  }

  public selectColor(color: string) {
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

  public moveItem({ dragItem, dragIndex }: IDragObject, { dropItem, dropIndex }: IDropObject, undo: boolean) {
    const todos = undo ? this.state.todos : this.state.havedos

    todos[dragIndex] = dropItem
    todos[dropIndex] = dragItem

    this.moveItemExchange(undo, todos)
  }

  public moveItemExchange(undo: boolean, todos: IToDoList[]) {
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

  public componentDidMount() {
    notification.info({
      duration: null,
      message: 'Info',
      description: HELPNOTE,
    })
    const token = sessionStorage.getItem('token')
    if (!token) {
      return console.log('a')
    }
    post('http://localhost:3000/getTodoList', { token })
    .then(res => {
      const { finishedList, unfinishedList } = res
      this.setState({
        todos: unfinishedList,
        havedos: finishedList
      })
    })
  }
  
  public render() {
    const titleProps = {
      title: TITLE,
      author: AUTHOR
    }
    return e(
      Row, { gutter: 8 },
      e(Col, { span: 8 }),
      e(Col, { span: 8 },
        e(Title, { ...titleProps }),
        e(
          'div',
          {
            className: 'list-wrapper'
          },
          e(
            Input,
            {
              addonAfter: e(Icon, { type: 'enter', onClick: this.addTodos }),
              value: this.state.inputText,
              onChange: this.handleInputChange,
              onKeyUp: this.addTodos
            }
          ),
          e(
            ColorBtn,
            {
              onClick: this.selectColor
            }
          ),
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
              list: this.state.todos,
              moveItem: this.moveItem
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
              list: this.state.havedos,
              moveItem: this.moveItem
            }
          )
        )
      ),
      e(Col, { span: 8 })
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
