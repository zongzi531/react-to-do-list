import * as React from 'react'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { Badge } from 'antd'
import NavTabs from './NavTabs'

configure({ adapter: new Adapter() })

test('renders NavTabs component when passed in', () => {
  const fn = jest.fn()
  const nav1 = shallow(<NavTabs tabsTitle="n1" tabsClass={true} counts={100} onClick={fn}/>)
  nav1.simulate('click')
  expect(fn).toHaveBeenCalled()
  expect(nav1.find(Badge).prop('count')).toEqual(100)
  expect(nav1.find('.active').find('a').children().at(0).text()).toEqual('n1')
  expect(nav1.find('.tabs-bottom').length).toEqual(1)
  const nav2 = shallow(<NavTabs tabsTitle="n2" tabsClass={false} counts={0} onClick={fn} />)
  expect(nav2.find('.tabs-bottom').length).toEqual(0)
})
