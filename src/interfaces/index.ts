export interface IToDoList {
  color: string
  text: string
  key: string
}

export interface IDragObject {
  dragItem: IToDoList
  dragIndex: number
}

export interface IDropObject {
  dropItem: IToDoList
  dropIndex: number
}
