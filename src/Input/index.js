import { Component, createElement as e } from 'react'

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
  }

  handleChange (e) {
    this.props.onInputChange(e.target.value)
  }

  handleKeyup (e) {
    e.keyCode === 13 && this.props.onKeyUp()
  }

  render () {
    return e(
      'div',
      {
        className: 'input-group'
      },
      e(
        'input',
        {
          className: 'form-control',
          text: 'text',
          name: 'list',
          value: this.props.inputText,
          onChange: this.handleChange,
          onKeyUp: this.handleKeyup
        }
      ),
      e(
        'span',
        {
          className: 'input-group-addon',
          onClick: this.props.onClick
        },
        e(
          'span',
          {
            className: 'glyphicon glyphicon-plus btn-add'
          }
        )
      )
    )
  }
}
