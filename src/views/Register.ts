import { Component, createElement as e } from 'react'
import { Row, Col, Button, notification, message, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Title from '../components/Title'
import { IFormItem } from '../interfaces'
import { REGISTERTITLE, REGISTERNOTE } from '../config'
import { post } from '../fetch'

const FormItem = Form.Item

interface IRegisterState {
  formItems: IFormItem[]
}

class Register extends Component<FormComponentProps, IRegisterState> {
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
        post('/regist', values)
          .then(res => {
            message.info(res.message, 3, () => {
              location.href = '/signin'
            })
          })
      }
    })
  }

  public componentDidMount () {
    notification.warning({
      duration: null,
      message: 'Warning Info',
      description: REGISTERNOTE,
    })
  }

  public render () {
    const titleProps = {
      title: REGISTERTITLE
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
          e(Button, { type: 'primary', htmlType: 'submit' }, 'Register')
        )
      ),
      e(Col, { span: 8 })
    )
  }
}

export default Form.create()(Register)
