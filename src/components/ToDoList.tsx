import * as React from 'react'
import ToDoListItem from './ToDoItem'
import { IToDo, IToDoS } from '../components/ToDoItem'
import { IToDoItemProps } from './ToDoItem'

interface IProps extends IToDoItemProps {
  listDisplay: boolean
  list: IToDoS
}

type ToDoList = ({
  listDisplay,
  list,
  undo,
  nowIndex,
  onInputChange,
  removeClick,
  haveClick,
  changeListText,
  editInputText,
  onKeyUp,
  onBlur }: IProps) => JSX.Element

const ToDoList: ToDoList = ({
  listDisplay,
  list,
  undo,
  nowIndex,
  onInputChange,
  removeClick,
  haveClick,
  changeListText,
  editInputText,
  onKeyUp,
  onBlur }) => (
    <ul className="list-ul">
      {
        listDisplay && list.map((value: IToDo, index: number) => {
          return (
            <ToDoListItem
              undo={undo}
              nowIndex={nowIndex}
              onInputChange={onInputChange}
              removeClick={removeClick}
              haveClick={haveClick}
              changeListText={changeListText}
              editInputText={editInputText}
              onKeyUp={onKeyUp}
              onBlur={onBlur}
              value={value}
              index={index}
              key={index} />
          )
        })
      }
    </ul>
)

export default ToDoList
