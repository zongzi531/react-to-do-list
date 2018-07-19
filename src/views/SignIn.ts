import { Component, createElement as e } from 'react'
import Title from '../components/Title'
import { SIGNINTITLE } from '../config'

export default class SignIn extends Component<{}, {}> {
  public render() {
    const titleProps = {
      title: SIGNINTITLE
    }
    return e(
      'div',
      { id: 'app', className: 'row' },
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' }, e(Title, { ...titleProps })),
      e('div', { className: 'col-md-4' })
    )
  }
}