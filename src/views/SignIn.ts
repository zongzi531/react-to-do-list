import { Component, createElement as e } from 'react'
import { Row, Col, Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Title from '../components/Title'
import { IFormItem } from '../interfaces'
import { SIGNINTITLE } from '../config'
import { post } from '../fetch'

const FormItem = Form.Item

interface ISignInState {
  formItems: IFormItem[]
}

class SignIn extends Component<FormComponentProps, ISignInState> {
  constructor(props: FormComponentProps) {
    super(props)
    this.state = {
      formItems: [
        {
          key: 'username',
          type: 'text',
          reqMessage: 'Please input your username!',
          icon: 'user',
          placeholder: 'Username'
        },
        {
          key: 'password',
          type: 'password',
          reqMessage: 'Please input your Password!',
          icon: 'lock',
          placeholder: 'Password'
        }
      ]
    }
  }

  public handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
          post('/login', values)
            .then(res => {
              const { token } = res
              sessionStorage.setItem('token', token)
              location.href = '/'
            })
      }
    })
  }

  public render() {
    const titleProps = {
      title: SIGNINTITLE
    }
    const { getFieldDecorator } = this.props.form
    const { formItems } = this.state
    return e(
      Row, { gutter: 8 },
      e(Col, { span: 8 }),
      e(Col, { span: 8 },
        e(Title, { ...titleProps }),
        e(Form, { onSubmit: this.handleSubmit },
          formItems.map((value: IFormItem, index: number) => {
            const { key, type, reqMessage, icon, placeholder } = value
            return e(FormItem, { key: index }, getFieldDecorator(key, {
              rules: [{ required: true, message: reqMessage }],
            })(e(Input, { prefix: e(Icon, { type: icon }), placeholder, type })))
          }),
          e(Button, { type: 'primary', htmlType: 'submit' }, 'Sign in')
        )
      ),
      e(Col, { span: 8 })
    )
  }
}

export default Form.create()(SignIn)
