import { Component, createElement as e } from 'react'
import Title from './components/Title'
import ListWrapper from './components/ListWrapper'
// import { DragDropContext } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'

// @DragDropContext(HTML5Backend)
export default class App extends Component<{}, {}> {
  public render() {
    return e(
      'div',
      { id: 'app', className: 'row'},
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' }, e(Title), e(ListWrapper)),
      e('div', { className: 'col-md-4' })
    )
  }
}
