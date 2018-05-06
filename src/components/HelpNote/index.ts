import { Component, createElement as e } from 'react'
import { HELPNOTE } from '../../config'

export default class HelpNote extends Component<{}, {}> {
  public render () {
    return e(
      'p',
      {
        className: 'help-block help-note'
      },
      HELPNOTE
    )
  }
}
