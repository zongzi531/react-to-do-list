import { Component, createElement as e } from 'react'

class Input extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onInputChange(e.target.value)
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
          onChange: this.handleChange
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

export default Input
