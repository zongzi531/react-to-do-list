import { Component, createElement as e } from 'react'

export default class Title extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '{ To Do List }',
      by: 'by Zong'
    }
  }

  render () {
    return e(
      'h1',
      {
        className: 'title'
      },
      this.state.title,
      e(
        'small',
        {
          className: 'by'
        },
        this.state.by
      )
    )
  }
}
