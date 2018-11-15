import * as React from 'react'
import { Button } from 'antd'
import { ICOLOR, COLORS, COLORFLAG } from '../config'

interface IProps {
  onClick(color: string): void
}

interface IState {
  activeIndex: number
  colors: COLORS
}

export default class ColorBtn extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      activeIndex: 0,
      colors: COLORS
    }
  }

  public onClick = (color: string, index: number) => {
    const { colors, activeIndex } = this.state
    colors[activeIndex].flag = COLORFLAG.EMPTY
    colors[index].flag = COLORFLAG.ACTIVE
    this.setState({
      colors,
      activeIndex: index
    })
    this.props.onClick(color)
  }

  public render() {
    const { colors } = this.state
    return (
      <div className="colorBtn">
        {
          colors.map((value: ICOLOR, index: number) => {
            return (
              <Button
                shape="circle"
                size="small"
                key={index}
                className={`btn-color-type btn-${value.color} ${value.flag}`}
                onClick={this.onClick.bind(this, value.color, index)} />
            )
          })
        }
      </div>
    )
  }
}
