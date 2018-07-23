import { Component, createElement as e } from 'react'
import { Input, Icon } from 'antd'
import { DragSource, DropTarget } from 'react-dnd'
import { ITEMTYPES as ItemTypes } from '../../config'
import { IToDoList, IDragObject, IDropObject } from '../../interfaces'

export interface IToDoListItemPropTypes {
  editInputText?: string
  index?: number
  nowIndex?: number
  undo: boolean
  value?: IToDoList
  connectDragSource?: any
  connectDropTarget?: any
  onInputChange?(value: string): void
  removeClick(index: number): void
  haveClick(index: number): void
  changeListText?(index: number): void
  onKeyUp?(): void
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void
  moveItem(drag: IDragObject, drop: IDropObject, undo: boolean): void
}

interface IToDoListItemState {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  removeClick(index: number): void
  haveClick(index: number): void
  changeListText(index: number): void
  handleKeyup(event: React.KeyboardEvent<HTMLInputElement>): void
  handleBlur(event: React.FocusEvent<HTMLInputElement>): void
  inputShow(flag: boolean): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const itemSource = {
  beginDrag(props: IToDoListItemPropTypes) {
    const { value, index, undo } = props
    return {
      value,
      index,
      undo
    }
  }
}

const itemTarget = {
  hover(props: IToDoListItemPropTypes, monitor: any, component: any) {
    const { value: dragItem, index: dragIndex, undo: dragUndo } = monitor.getItem()
    const { value: dropItem, index: dropIndex, undo: dropUndo } = props
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

class ToDoListItem extends Component<IToDoListItemPropTypes, IToDoListItemState> {
  constructor(props: IToDoListItemPropTypes) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.moveItem = this.moveItem.bind(this)
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onInputChange) {
      this.props.onInputChange(event.target.value)
    }if (this.props.onInputChange) {
      this.props.onInputChange(event.target.value)
    }
  }

  public removeClick(index: number) {
    this.props.removeClick(index)
  }

  public haveClick(index: number) {
    this.props.haveClick(index)
  }

  public changeListText(index: number) {
    if (this.props.changeListText) { this.props.changeListText(index) }
  }

  public handleKeyup(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && this.props.onKeyUp) {
      this.props.onKeyUp()
    }
  }

  public handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  public change(flag: boolean) {
    let glyphicon = null
    let through = null
    let input = null
    if (flag) {
      glyphicon = 'checkbox-todo'
      through = ''
      input = e(
        Input,
        {
          className: 'changeText',
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

  public moveItem(drag: IDragObject, drop: IDropObject, undo: boolean) {
    this.props.moveItem(drag, drop, undo)
  }

  public inputShow(flag: boolean) {
    if (flag) { return this.change(this.props.undo).input }
    return false
  }

  public render() {
    const { connectDragSource, connectDropTarget, value, index, undo, nowIndex } = this.props

    return connectDragSource(connectDropTarget(e(
      'li',
      {
        className: `list-item bg-${value ? value.color: ''}`
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
          className: 'btn-del',
          onClick: this.removeClick.bind(this, index)
        },
        e(Icon, { type: 'delete' })
      ),
      e(
        'p',
        {
          className: 'list-text',
          title: value ? value.text: '',
          onClick: this.changeListText.bind(this, index)
        },
        e('span', { className: `${this.change(undo).through}` }, value ? value.text : ''),
        this.inputShow(nowIndex === index)
      )
    )))
  }
}

export default DragSource(ItemTypes.Item, itemSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(DropTarget(ItemTypes.Item, itemTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ToDoListItem))
