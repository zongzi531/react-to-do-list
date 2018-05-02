import { Component, createElement as e } from 'react'
import { COLORS } from '../../config'

interface IcolorConfig {
  color: string
  flag: string
}

interface IColorBtnPropTypes {
  onClick(color: string): void
}

interface IColorBtnState {
  activeIndex: number
  colors: IcolorConfig[]
}

export default class ColorBtn extends Component<IColorBtnPropTypes, IColorBtnState> {
  constructor (props: IColorBtnPropTypes) {
    super(props)
    this.state = {
      activeIndex: 0,
      colors: COLORS
    }
  }

  public onClick (color: string, index: number) {
    const { colors, activeIndex } = this.state
    colors[activeIndex].flag = ''
    colors[index].flag = 'active'
    this.setState({
      colors,
      activeIndex: index
    })
    this.props.onClick(color)
  }

  public render () {
    const { colors } = this.state
    return e(
      'div',
      {
        className: 'colorBtn'
      },
      colors.map((value, index) => {
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
