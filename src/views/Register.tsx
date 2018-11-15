import * as React from 'react'
import { Row, Col, Button, notification, message, Form, Icon, Input } from 'antd'
import Title from '../components/Title'
import { IFormItem, FormItems, AntdFormAndRouterProps } from '../interfaces'
import { VIEWSTITLE, NOTE } from '../config'
import { post } from '../fetch'

const FormItem = Form.Item

interface IRegisterState {
  formItems: FormItems
}

class Register extends React.Component<AntdFormAndRouterProps, IRegisterState> {
  constructor(props: AntdFormAndRouterProps) {
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
            message.info(res.message)
          })
      }
    })
  }

  public goSignin = () => {
    this.props.history.push('/signin')
  }

  public componentDidMount() {
    notification.warning({
      duration: null,
      message: 'Warning Info',
      description: NOTE.REGISTER,
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    const { formItems } = this.state
    return (
      <Row gutter={8}>
        <Col span={8} />
        <Col span={8}>
          <Title title={VIEWSTITLE.REGISTER}/>
          <Form onSubmit={this.handleSubmit}>
            {
              formItems.map((value: IFormItem, index: number) => {
                const { key, type, reqMessage, icon, placeholder } = value
                return (
                  <FormItem key={index}>
                    {
                      getFieldDecorator(key, {
                        rules: [{ required: true, message: reqMessage }],
                      })(
                        <Input prefix={<Icon type={icon as string} />} placeholder={placeholder} type={type} />
                      )
                    }
                  </FormItem>
                )
              })
            }
            <Button type="primary" htmlType="submit">Register</Button>
            <p>Or <a onClick={this.goSignin}>sign in now!</a></p>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
    )
  }
}

export default Form.create()(Register)
