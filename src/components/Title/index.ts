import { Component, createElement as e } from 'react'

interface ITitlePropTypes {
  title: string,
  author?: string
}

export default class Title extends Component<ITitlePropTypes, {}> {
  public render () {
    const { title, author } = this.props
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
        author
      )
    )
  }
}
