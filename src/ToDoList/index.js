import { Component, createElement as e } from 'react'
import ToDoListItem from '../ToDoListItem'

export default class ToDoList extends Component {
  render () {
    if (this.props.listDisplay) {
      return e(
        'ul',
        {
          className: 'list-ul'
        },
        this.props.list.map((value, index) => {
          return e(
            ToDoListItem,
            {
              undo: this.props.undo,
              nowIndex: this.props.nowIndex,
              onInputChange: this.props.onInputChange,
              removeClick: this.props.removeClick,
              haveClick: this.props.haveClick,
              changeListText: this.props.changeListText,
              editInputText: this.props.editInputText,
              onKeyUp: this.props.onKeyUp,
              onBlur: this.props.onBlur,
              value,
              index,
              key: value.key,
              moveItem: this.props.moveItem
            }
          )
        })
      )
    } else {
      return false
    }
  }
}
