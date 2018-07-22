import { Component, createElement as e } from 'react'
import { IformItem } from '../../interfaces'

interface IFormPropTypes {
  form: IformItem[]
  onInputChange(index: number, value: string): void
}

interface IFormState {
  handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>): void
}

export default class Form extends Component<IFormPropTypes, IFormState> {
  constructor(props: IFormPropTypes) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  public handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInputChange(index, event.target.value)
  }

  public render() {
    const { form } = this.props
    return e(
      'form', {},
      form.map((item, index) => {
        const { label, type, placeholder, value } = item
        return e(
          'div', { className: 'form-group', key: index },
          e('label', {}, label),
          e('input', { className: 'form-control', type, placeholder, value, onChange: this.handleChange.bind(this, index) })
        )
      })
    )
  }
}