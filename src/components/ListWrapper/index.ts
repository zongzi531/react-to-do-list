import { Component, createElement as e } from 'react'

export default class ListWrapper extends Component<{}, {}> {
  public render () {
    return e(
      'div',
      {
        className: 'list-wrapper'
      }
    )
  }
}
