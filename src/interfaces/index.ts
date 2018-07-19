export interface IToDoList {
  color: string
  text: string
  key: string
}

export interface IformItem {
  label: string,
  type: string,
  placeholder?: string,
  value: string
}

export interface IDragObject {
  dragItem: IToDoList
  dragIndex: number
}

export interface IDropObject {
  dropItem: IToDoList
  dropIndex: number
}
