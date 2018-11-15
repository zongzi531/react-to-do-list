import * as React from 'react'
import { RouterProps } from 'react-router'
import { Row, Col, notification, Input, Icon, message } from 'antd'
import Title from '../components/Title'
import ColorBtn from '../components/ColorBtn'
import NavTabs from '../components/NavTabs'
import ToDoList from '../components/ToDoList'
import { VIEWSTITLE, VIEWSAUTHOR, NUMBER, STRING, TODOSLABEL, NOTE, COLOR } from '../config'
import { IToDoS } from '../components/ToDoItem'
import { post } from '../fetch'

interface IListWrapperState {
  inputText: string
  editInputText: string
  nowIndex: number
  keyFlag: number
  color: string
  todos: IToDoS
  havedos: IToDoS
  todoflag: boolean
  havedoflag: boolean
}

export default class Home extends React.Component<RouterProps, IListWrapperState> {
  constructor(props: RouterProps) {
    super(props)
    this.state = {
      inputText: STRING.EMPTY,
      editInputText: STRING.EMPTY,
      nowIndex: NUMBER.MINUSONE,
      keyFlag: 0,
      color: COLOR.DEFAULT,
      todos: [],
      havedos: [],
      todoflag: true,
      havedoflag: false
    }
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputText: event.target.value
    })
  }

  public handleListInputChange = (editInputText: string) => {
    this.setState({
      editInputText
    })
  }

  public addTodos = (event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLSpanElement>) => {
    if (event.keyCode === 13 || event.clientX) {
      const content = this.state.inputText.trim()
      if (content) {
        const params = {
          token: sessionStorage.getItem('token'),
          color: this.state.color,
          content
        }
        post('/addTodo', params)
          .then(res => {
            message.info(res.message)
            this.getTodoList()
            this.setState({
              inputText: STRING.EMPTY
            })
          })
      }
    }
  }

  public editTodos = () => {
    const content = this.state.editInputText.trim()
    if (content) {
      const { todos } = this.state
      const nowTodo = todos[this.state.nowIndex]
      const { todoId, color, status } = nowTodo
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
          this.setState({
            editInputText: STRING.EMPTY,
            nowIndex: NUMBER.MINUSONE
          })
        })
    }
  }

  public changeTodoStatus = (status: string, index: number) => {
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

  public remove = (name: string, index: number) => {
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

  public changeTodos = (index: number) => {
    this.setState({
      nowIndex: index,
      editInputText: this.state.todos[index].content
    })
  }

  public cancelChange = () => {
    this.setState({
      nowIndex: NUMBER.MINUSONE
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

  public getTodoList = () => {
    const token = sessionStorage.getItem('token')
    post('/getTodoList', { token })
      .then(res => {
        const { finishedList, unfinishedList } = res
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
      description: NOTE.HELP,
    })
    const token = sessionStorage.getItem('token')
    if (!token) {
      return this.props.history.push('/signin')
    }
    this.getTodoList()
  }

  public render() {
    const titleProps = {
      title: VIEWSTITLE.HOME,
      author: VIEWSAUTHOR.ZONG
    }
    return (
      <Row gutter={8}>
        <Col span={8} />
        <Col span={8}>
          <Title {...titleProps} />
          <div className="list-wrapper">
            <Input
              addonAfter={<Icon type="enter" onClick={this.addTodos} />}
              value={this.state.inputText}
              onChange={this.handleInputChange}
              onKeyUp={this.addTodos} />
            <ColorBtn onClick={this.selectColor} />
            <NavTabs
              tabsTitle={TODOSLABEL.UNFINISHED}
              tabsClass={!this.state.todos.length || !this.state.todoflag}
              counts={this.state.todos.length}
              onClick={this.reverseTodo} />
            <ToDoList
              undo={true}
              listDisplay={this.state.todoflag}
              nowIndex={this.state.nowIndex}
              onInputChange={this.handleListInputChange}
              removeClick={this.remove.bind(this, 'todos')}
              haveClick={this.changeTodoStatus.bind(this, 'FINISHED')}
              changeListText={this.changeTodos}
              editInputText={this.state.editInputText}
              onKeyUp={this.editTodos}
              onBlur={this.cancelChange}
              list={this.state.todos} />
            <NavTabs
              tabsTitle={TODOSLABEL.FINISHED}
              tabsClass={!this.state.havedos.length || !this.state.havedoflag}
              counts={this.state.havedos.length}
              onClick={this.reverseUndo} />
            <ToDoList
              undo={false}
              listDisplay={this.state.havedoflag}
              removeClick={this.remove.bind(this, 'havedos')}
              haveClick={this.changeTodoStatus.bind(this, 'UNFINISHED')}
              list={this.state.havedos} />
          </div>
        </Col>
        <Col span={8} />
      </Row>
    )
  }
}
