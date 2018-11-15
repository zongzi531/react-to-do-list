import * as React from 'react'
import { Input, Icon } from 'antd'

export interface IToDo {
  color: string
  todoId: string
  content: string
  status: string
}

export type IToDoS = IToDo[]

export interface IToDoItemProps {
  editInputText?: string
  index?: number
  nowIndex?: number
  undo: boolean
  value?: IToDo
  onInputChange?(value: string): void
  removeClick(index: number): void
  haveClick(index: number): void
  changeListText?(index: number): void
  onKeyUp?(): void
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void
}

interface IToDoItemState {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  removeClick(index: number): void
  haveClick(index: number): void
  changeListText(index: number): void
  handleKeyup(event: React.KeyboardEvent<HTMLInputElement>): void
  handleBlur(event: React.FocusEvent<HTMLInputElement>): void
  inputShow(flag: boolean): JSX.Element
}

export default class ToDoListItem extends React.Component<IToDoItemProps, IToDoItemState> {
  public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onInputChange) { this.props.onInputChange(event.target.value) }
  }

  public removeClick = (index: number) => {
    this.props.removeClick(index)
  }

  public haveClick = (index: number) => {
    this.props.haveClick(index)
  }

  public changeListText = (index: number) => {
    if (this.props.changeListText) { this.props.changeListText(index) }
  }

  public handleKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && this.props.onKeyUp) { this.props.onKeyUp() }
  }

  public handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) { this.props.onBlur(event) }
  }

  public change = (flag: boolean) => {
    let glyphicon: string
    let through: string
    let input: JSX.Element | undefined
    if (flag) {
      glyphicon = 'star-o'
      through = ''
      input = (
        <Input
          className="changeText"
          value={this.props.editInputText}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyup}
          onBlur={this.handleBlur}
          autoFocus={true} />
      )
    } else {
      glyphicon = 'star'
      through = 'through'
    }
    return {
      glyphicon,
      through,
      input
    }
  }

  public inputShow = (flag: boolean) => {
    if (flag) { return this.change(this.props.undo).input }
    return false
  }

  public render() {
    const { value, index, undo, nowIndex } = this.props

    return (
      <li className={`list-item bg-${value ? value.color : ''}`}>
        <Icon
          className="control-icon"
          type={this.change(undo).glyphicon}
          onClick={this.haveClick.bind(this, index)} />
        <Icon type="close" onClick={this.removeClick.bind(this, index)} />
        <p
          className="list-text"
          title={value ? value.content : ''}
          onClick={this.changeListText.bind(this, index)}>
          <span className={`${this.change(undo).through}`}>{value ? value.content : ''}</span>
          {this.inputShow(nowIndex === index)}
        </p>
      </li>
    )
  }
}
