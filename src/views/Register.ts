import { Component, createElement as e } from 'react'
import Title from '../components/Title'
import HelpNote from '../components/HelpNote'
import Form from '../components/Form'
import { IformItem } from '../interfaces'
import { REGISTERTITLE, REGISTERNOTE, WARNINGCOLOR } from '../config'
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
          value: ''
        },
        {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
          value: ''
        }
      ]
    }
  }

  public inputChange (value: string, index: string) {
    console.log(value, index)
  }

  public render() {
    const titleProps = {
      title: REGISTERTITLE
    }
    const helpNoteProps = {
      text: REGISTERNOTE,
      color: WARNINGCOLOR
    }
    const { form } = this.state
    return e(
      'div',
      { id: 'app', className: 'row' },
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' },
        e(Title, { ...titleProps }),
        e(HelpNote, { ...helpNoteProps }),
        e(Form, { form }),
        e('button', { className: 'btn btn-primary', type: 'button' }, 'Register')
      ),
      e('div', { className: 'col-md-4' })
    )
  }
}