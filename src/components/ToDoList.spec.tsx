import * as React from 'react'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import ToDoList from './ToDoList'
import ToDoItem, { IToDoS } from './ToDoItem'

configure({ adapter: new Adapter() })

const listEmpty: IToDoS = []

const list: IToDoS = [{ color: 'i1', todoId: 'i1', content: 'i1', status: 'i1' }]

test('renders ToDoList component when passed in', () => {
  const todoList1 = shallow(<ToDoList listDisplay={false} list={listEmpty} undo={true} removeClick={jest.fn()} haveClick={jest.fn()} />)
  const todoList2 = shallow(<ToDoList listDisplay={true} list={listEmpty} undo={true} removeClick={jest.fn()} haveClick={jest.fn()} />)
  const todoList3 = shallow(<ToDoList listDisplay={true} list={list} undo={true} removeClick={jest.fn()} haveClick={jest.fn()} />)
  expect(todoList1.children().length).toEqual(0)
  expect(todoList2.children().length).toEqual(0)
  expect(todoList3.find(ToDoItem).length).toEqual(1)
})