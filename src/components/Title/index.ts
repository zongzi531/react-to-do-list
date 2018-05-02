import { Component, createElement as e } from 'react'
import { TITLE, AUTHOR } from '../../config'

export default class Title extends Component<{}, {}> {
  public render () {
    return e(
      'h1',
      {
        className: 'title'
      },
      TITLE,
      e(
        'small',
        {
          className: 'by'
        },
        AUTHOR
      )
    )
  }
}
