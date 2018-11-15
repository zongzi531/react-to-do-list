import * as React from 'react'
import { Badge } from 'antd'

interface IProps {
  tabsTitle: string
  tabsClass: boolean
  counts: number
  onClick(): void
}

type NavTabs = ({ tabsTitle, tabsClass, counts, onClick }: IProps) => JSX.Element

const BadgeStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: '#999',
  boxShadow: '0 0 0 1px #d9d9d9 inset'
}

const NavTabs: NavTabs = ({ onClick, tabsClass, tabsTitle, counts }) => {
  return (
    <ul
      className={`nav nav-tabs nav-justified ${tabsClass ? 'tabs-bottom' : ''}`}
      onClick={onClick}
    >
      <li className="active">
        <a>
          {tabsTitle}
          <Badge
            count={counts}
            className="badge"
            style={BadgeStyle} />
        </a>
      </li>
    </ul>
  )
}

export default NavTabs
