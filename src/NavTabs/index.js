import { Component, createElement as e } from 'react'

class NavTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      space: ' '
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.onClick()
  }

  render () {
    return e(
      'ul',
      {
        className: `nav nav-tabs nav-justified ${this.props.tabsClass ? 'tabs-bottom' : ''}`,
        role: 'tablist',
        onClick: this.onClick
      },
      e(
        'li',
        {
          className: 'active',
          role: 'presentation'
        },
        e(
          'a',
          {
            href: '#'
          },
          this.props.tabsTitle,
          this.state.space,
          e(
            'span',
            {
              className: 'badge'
            },
            this.props.counts
          )
        )
      )
    )
  }
}

export default NavTabs
