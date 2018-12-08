import * as React from 'react'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { Button } from 'antd'
import ColorBtn from './ColorBtn'

configure({ adapter: new Adapter() })

test('renders ColorBtn component when passed in', () => {
  const fn = jest.fn()
  const btn = shallow(<ColorBtn onClick={fn}/>)
  const btns = btn.find(Button)
  btns.forEach(node => node.simulate('click'))
  expect(fn).toHaveBeenCalledTimes(btns.length)
})