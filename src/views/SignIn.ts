import { Component, createElement as e } from 'react'
import { Row, Col, Button } from 'antd'
import Title from '../components/Title'
import Form from '../components/Form'
import { IformItem } from '../interfaces'
import { SIGNINTITLE } from '../config'
import { post } from '../fetch'

interface ISignInState {
  form: IformItem[]
}


export default class SignIn extends Component<{}, ISignInState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      form: [
        {
          label: 'Name',
          type: 'text',
          placeholder: 'Name',
          key: 'username',
          value: ''
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
          key: 'password',
          value: ''
        }
      ]
    }
    this.inputChange = this.inputChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  public inputChange(index: number, value: string) {
    const form = this.state.form
    form[index].value = value
    this.setState({
      form
    })
  }

  public onClick() {
    const prarms = {}
    for (const i of this.state.form) {
      const { key, value } = i
      prarms[key] = value
    }
    post('/login', prarms)
    .then(res => {
      const { token } = res
      sessionStorage.setItem('token', token)
      location.href = '/'
    })
  }

  public render() {
    const titleProps = {
      title: SIGNINTITLE
    }
    const { form } = this.state
    return e(
      Row, { gutter: 8 },
      e(Col, { span: 8 }),
      e(Col, { span: 8 },
        e(Title, { ...titleProps }),
        e(Form, { form, onInputChange: this.inputChange }),
        e(Button, { type: 'primary', onClick: this.onClick }, 'Sign in')
      ),
      e(Col, { span: 8 })
    )
  }
}