import { Component, createElement as e } from 'react'
import ItemTypes from '../ItemTypes.js'
import { DragSource, DropTarget } from 'react-dnd'

const itemSource = {
  beginDrag(props) {
    const { value, index, undo } = props
    return {
      value,
      index,
      undo
    }
  }
}

const itemTarget = {
  hover (props, monitor, component) {
    const { value:dragItem, index:dragIndex, undo:dragUndo } = monitor.getItem()
    const { value:dropItem, index:dropIndex, undo:dropUndo } = props
    const { moveItem } = component

    if (dragUndo !== dropUndo || dragIndex === dropIndex) { return }

    moveItem({
      dragItem,
      dragIndex
    }, {
      dropItem,
      dropIndex
    }, dragUndo)

    monitor.getItem().index = dropIndex
  }
}

@DragSource(ItemTypes.Item, itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.Item, itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class ToDoListItem extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.moveItem = this.moveItem.bind(this)
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

  moveItem (drag, drop, undo) {
    this.props.moveItem(drag, drop, undo)
  }

  inputShow (flag) {
    if (flag) { return this.change(this.props.undo).input }
  }

  render () {
    const { connectDragSource, connectDropTarget, value, index, undo, nowIndex } = this.props

    return connectDragSource(connectDropTarget(e(
      'li',
      {
        className: `list-item bg-${value.color}`
      },
      e('span', { className: 'glyphicon glyphicon-option-vertical' }),
      e(
        'span',
        {
          className: `${this.change(undo).glyphicon}`,
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
          className: 'list-text',
          title: value.text,
          onClick: this.changeListText.bind(this, index)
        },
        e('span', { className: `${this.change(undo).through}` }, value.text),
        this.inputShow(nowIndex === index)
      )
    )))
  }
}
