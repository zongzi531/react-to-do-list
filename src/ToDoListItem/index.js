import { Component, createElement as e } from 'react'

class ToDoListItem extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
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

  changeListText (index) {
    if (this.props.changeListText) { this.props.changeListText(index) }
  }

  handleKeyup (e) {
    e.keyCode === 13 && this.props.onKeyUp()
  }

  handleBlur (e) {
    this.props.onBlur(e)
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
          value: this.props.editInputText,
          onChange: this.handleChange,
          onKeyUp: this.handleKeyup,
          onBlur: this.handleBlur,
          autoFocus: true
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
    return e(
      'li',
      {
        className: `list-item bg-${this.props.value.color}`
      },
      e('span', { className: 'glyphicon glyphicon-option-vertical' }),
      e(
        'span',
        {
          className: `${this.change(this.props.undo).glyphicon}`,
          onClick: this.haveClick.bind(this, this.props.index)
        }
      ),
      e(
        'span',
        {
          className: 'glyphicon glyphicon glyphicon-remove btn-del',
          onClick: this.removeClick.bind(this, this.props.index)
        }
      ),
      e(
        'p',
        {
          className: 'list-text',
          title: this.props.value.text,
          onClick: this.changeListText.bind(this, this.props.index)
        },
        e('span', { className: `${this.change(this.props.undo).through}` }, this.props.value.text),
        this.inputShow(this.props.nowIndex === this.props.index)
      )
    )
  }
}

export default ToDoListItem
