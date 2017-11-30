import { Component, createElement as e } from 'react'

class HelpNote extends Component {
  constructor (props) {
    super(props)
    this.state = {
      note: '来添加你的备忘录吧！'
    }
  }

  render () {
    return e(
      'p',
      {
        className: 'help-block help-note'
      },
      this.state.note
    )
  }
}

export default HelpNote
