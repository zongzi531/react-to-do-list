import { Component, createElement as e } from 'react'
import ToDoListItem from '../ToDoListItem'
import { IToDoList } from '../../interfaces'
import { IToDoListItemPropTypes } from '../ToDoListItem'

interface IToDoListPropTypes extends IToDoListItemPropTypes {
  listDisplay: boolean
  list: IToDoList[]
}

export default class ToDoList extends Component<IToDoListPropTypes, {}> {
  public render () {
    if (this.props.listDisplay) {
      return e(
        'ul',
        {
          className: 'list-ul'
        },
        this.props.list.map((value: IToDoList, index: number) => {
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
              key: index
            }
          )
        })
      )
    } else {
      return false
    }
  }
}
