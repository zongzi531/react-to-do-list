import { Component, createElement as e } from 'react'
import { Row, Col, notification, Input, Icon, message } from 'antd'
import Title from '../components/Title'
import ColorBtn from '../components/ColorBtn'
import NavTabs from '../components/NavTabs'
import ToDoList from '../components/ToDoList'
import { TITLE, AUTHOR, MINUSONE, NULLSTRING, LABELTODOS, LABELHAVEDOS, HELPNOTE } from '../config'
import { IToDoList } from '../interfaces'
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

export default class Home extends Component<{}, IListWrapperState> {
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
    this.remove = this.remove.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.reverseTodo = this.reverseTodo.bind(this)
    this.reverseUndo = this.reverseUndo.bind(this)
    this.changeTodos = this.changeTodos.bind(this)
    this.cancelChange = this.cancelChange.bind(this)
    this.changeTodoStatus = this.changeTodoStatus.bind(this)
    this.getTodoList = this.getTodoList.bind(this)
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
        const params = {
          token: sessionStorage.getItem('token'),
          color: this.state.color,
          content: text
        }
        post('/addTodo', params)
          .then(res => {
            message.info(res.message)
            this.getTodoList()
            this.setState({
              inputText: NULLSTRING
            })
          })
      }
    }
  }

  public editTodos() {
    const text = this.state.editInputText.trim()
    if (text) {
      const { todos } = this.state
      const nowTodo = todos[this.state.nowIndex]
      const { todoId, color, status } = nowTodo
      const params = {
        token: sessionStorage.getItem('token'),
        todoId,
        color,
        content: text,
        status
      }
      post('/updateTodo', params)
      .then(res => {
        message.info(res.message)
        this.getTodoList()
        this.setState({
          editInputText: NULLSTRING,
          nowIndex: MINUSONE
        })
      })
    }
  }

  public changeTodoStatus(status:string, index: number) {
    console.log(status, index)
    const { todos } = this.state
    const { havedos } = this.state
    let todo = todos[index]
    if (status === 'UNFINISHED') {
      todo = havedos[index]
    }
    const { todoId, color, content } = todo
    const params = {
      token: sessionStorage.getItem('token'),
      todoId,
      color,
      content,
      status
    }
    post('/updateTodo', params)
      .then(res => {
        message.info(res.message)
        this.getTodoList()
      })
  }

  public remove(name: string, index: number) {
    const todo = this.state[name]
    const nowTodo = todo[index]
    const { todoId, color, content } = nowTodo
    const params = {
      token: sessionStorage.getItem('token'),
      todoId,
      color,
      content,
      status: 'DELETED'
    }
    post('/updateTodo', params)
      .then(res => {
        message.info(res.message)
        this.getTodoList()
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

  public getTodoList () {
    const token = sessionStorage.getItem('token')
    post('/getTodoList', { token })
      .then(res => {
        const { finishedList, unfinishedList } = res
        for (const i of unfinishedList) {
          i.text = i.content
        }
        for (const i of finishedList) {
          i.text = i.content
        }
        this.setState({
          todos: unfinishedList,
          havedos: finishedList
        })
      })
  }

  public componentDidMount() {
    notification.info({
      duration: null,
      message: 'Info',
      description: HELPNOTE,
    })
    const token = sessionStorage.getItem('token')
    if (!token) {
      location.href = '/signin'
    }
    this.getTodoList()
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
              removeClick: this.remove.bind(this, 'todos'),
              haveClick: this.changeTodoStatus.bind(this, 'FINISHED'),
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
              removeClick: this.remove.bind(this, 'havedos'),
              haveClick: this.changeTodoStatus.bind(this,'UNFINISHED'),
              list: this.state.havedos
            }
          )
        )
      ),
      e(Col, { span: 8 })
    )
  }
}