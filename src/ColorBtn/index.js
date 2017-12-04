import { Component, createElement as e } from 'react'

export default class ColorBtn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      colors: [
        {color: 'default', flag: 'active'},
        {color: 'primary', flag: ''},
        {color: 'success', flag: ''},
        {color: 'info', flag: ''},
        {color: 'warning', flag: ''},
        {color: 'danger', flag: ''}
      ]
    }
  }

  onClick (color, index) {
    let colors = this.state.colors
    colors[this.state.activeIndex].flag = ''
    colors[index].flag = 'active'
    this.setState({
      colors,
      activeIndex: index
    })
    this.props.onClick(color)
  }

  render () {
    return e(
      'div',
      {
        className: 'colorBtn'
      },
      this.state.colors.map((value, index) => {
        return e(
          'button',
          {
            type: 'button',
            key: index,
            className: `btn btn-${value.color} ${value.flag}`,
            onClick: this.onClick.bind(this, value.color, index)
          }
        )
      })
    )
  }
}
