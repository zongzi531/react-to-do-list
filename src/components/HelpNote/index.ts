import { Component, createElement as e } from 'react'

interface IHelpNotePropTypes {
  text?: string,
  color?: string
}

export default class HelpNote extends Component<IHelpNotePropTypes, {}> {
  public render () {
    const { text, color } = this.props
    return e(
      'p',
      {
        className: 'help-block help-note',
        style: {
          color
        }
      },
      text
    )
  }
}
