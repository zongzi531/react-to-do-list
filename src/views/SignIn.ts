import { Component, createElement as e } from 'react'
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
    post('http://localhost:3000/login', prarms)
  }

  public render() {
    const titleProps = {
      title: SIGNINTITLE
    }
    const { form } = this.state
    return e(
      'div',
      { id: 'app', className: 'row' },
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' },
        e(Title, { ...titleProps }),
        e(Form, { form, onInputChange: this.inputChange }),
        e('button', { className: 'btn btn-primary', type: 'button', onClick: this.onClick }, 'Sign in')
      ),
      e('div', { className: 'col-md-4' })
    )
  }
}