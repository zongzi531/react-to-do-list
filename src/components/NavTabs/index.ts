import { Component, createElement as e } from 'react'

interface INavTabsProp {
  tabsTitle: string
  tabsClass: boolean
  counts: number
  onClick(): void
}

export default class NavTabs extends Component<INavTabsProp, {}> {
  public render() {
    const { onClick, tabsClass, tabsTitle, counts } = this.props
    return e(
      'ul',
      {
        className: `nav nav-tabs nav-justified ${tabsClass ? 'tabs-bottom' : ''}`,
        role: 'tablist',
        onClick
      },
      e(
        'li',
        {
          className: 'active',
          role: 'presentation'
        },
        e(
          'a',
          {},
          tabsTitle,
          e(
            'span',
            {
              className: 'badge'
            },
            counts
          )
        )
      )
    )
  }
}
