import { Component, createElement as e } from 'react'

class ToDoList extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onInputChange(e.target.value)
  }

  removeClick (index) {
    this.props.removeClick(index)
  }

  haveClick (index) {
    this.props.haveClick(index)
  }

  change (flag) {
    let glyphicon = null
    let through = null
    let input = null
    if (flag) {
      glyphicon = 'checkbox-todo'
      through = ''
      input = e(
        'input',
        {
          type: 'text',
          className: 'form-control changeText',
          onChange: this.handleChange
        }
      )
    } else {
      glyphicon = 'glyphicon glyphicon-ok checkbox-havedo'
      through = 'through'
    }
    return {
      glyphicon,
      through,
      input
    }
  }

  inputShow (flag) {
    if (flag) { return this.change(this.props.undo).input }
  }

  render () {
    if (this.props.listDisplay) {
      return e(
        'ul',
        {
          className: 'list-ul'
        },
        this.props.list.map((value, index) => {
          return e(
            'li',
            {
              className: `list-item bg-${value.color}`,
              key: `${value.key}`
            },
            e('span', { className: 'glyphicon glyphicon-option-vertical' }),
            e(
              'span',
              {
                className: `${this.change(this.props.undo).glyphicon}`,
                onClick: this.haveClick.bind(this, index)
              }
            ),
            e(
              'span',
              {
                className: 'glyphicon glyphicon glyphicon-remove btn-del',
                onClick: this.removeClick.bind(this, index)
              }
            ),
            e(
              'p',
              {
                className: 'list-text'
              },
              e('span', { className: `${this.change(this.props.undo).through}` }, value.text),
              this.inputShow(this.props.nowIndex === index)
            )
          )
        })
      )
    } else {
      return false
    }
  }
}

export default ToDoList
