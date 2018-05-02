import { Component, createElement as e } from 'react'

interface IInputPropTypes {
  inputText: string
  onInputChange(value: string): void
  onKeyUp(): void
  onClick(): void
}

interface IInputState {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void
  handleKeyup(event: React.KeyboardEvent<HTMLInputElement>): void
}

export default class Input extends Component<IInputPropTypes, IInputState> {
  constructor (props: IInputPropTypes) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
  }

  public handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInputChange(event.target.value)
  }

  public handleKeyup (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      this.props.onKeyUp()
    }
  }

  public render () {
    const { inputText, onClick } = this.props
    return e(
      'div',
      {
        className: 'input-group'
      },
      e(
        'input',
        {
          className: 'form-control',
          text: 'text',
          name: 'list',
          value: inputText,
          onChange: this.handleChange,
          onKeyUp: this.handleKeyup
        }
      ),
      e(
        'span',
        {
          className: 'input-group-addon',
          onClick
        },
        e(
          'span',
          {
            className: 'glyphicon glyphicon-plus btn-add'
          }
        )
      )
    )
  }
}
