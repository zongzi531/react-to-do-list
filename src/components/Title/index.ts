import { Component, createElement as e } from 'react'

interface ITitlePropTypes {
  title: string
  by:  string
}

export default class Title extends Component<ITitlePropTypes, {}> {
  public static defaultProps = {
    title: '{ To Do List }',
    by: 'by Zong'
  }

  public render () {
    const { title, by } = this.props
    return e(
      'h1',
      {
        className: 'title'
      },
      title,
      e(
        'small',
        {
          className: 'by'
        },
        by
      )
    )
  }
}
