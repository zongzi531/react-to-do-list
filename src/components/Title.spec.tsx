import * as React from 'react'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Title from './Title'

configure({ adapter: new Adapter() })

test('renders Title component when passed in', () => {
  const title1 = shallow(<Title title="t1" />)
  expect(title1.find('.title').children().at(0).text()).toEqual('t1')
  expect(title1.find('.title').children().length).toEqual(1)
  const title2 = shallow(<Title title="t2" author="a2" />)
  expect(title2.find('.title').children().at(0).text()).toEqual('t2')
  expect(title2.find('.title').find('.by').text()).toEqual('a2')
  expect(title2.find('.title').children().length).toEqual(2)
})
