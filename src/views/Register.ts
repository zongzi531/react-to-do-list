import { Component, createElement as e } from 'react'
import { Row, Col, Button, notification } from 'antd'
import Title from '../components/Title'
import Form from '../components/Form'
import { IformItem } from '../interfaces'
import { REGISTERTITLE, REGISTERNOTE } from '../config'
import { post } from '../fetch'

interface IRegisterState {
  form: IformItem[]
}

export default class Register extends Component<{}, IRegisterState> {
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
  
  public onClick () {
    const prarms = {}
    for (const i of this.state.form) {
      const { key , value } = i
      prarms[key] = value
    }
    post('http://localhost:3000/regist', prarms)
  }

  public componentDidMount () {
    notification.warning({
      duration: null,
      message: 'Warning Info',
      description: REGISTERNOTE,
    })
  }

  public render() {
    const titleProps = {
      title: REGISTERTITLE
    }
    const { form } = this.state
    return e(
      Row, { gutter: 8 },
      e(Col, { span: 8 }),
      e(Col, { span: 8 },
        e(Title, { ...titleProps }),
        e(Form, { form, onInputChange: this.inputChange }),
        e(Button, { type: 'primary', onClick: this.onClick }, 'Register')
      ),
      e(Col, { span: 8 })
    )
  }
}