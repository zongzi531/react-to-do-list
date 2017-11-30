import { Component, createElement as e } from 'react'
import Title from './Title'
import ListWrapper from './ListWrapper'

class App extends Component {
  render() {
    return e(
      'div',
      { id: 'app', className: 'row'},
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' }, e(Title), e(ListWrapper)),
      e('div', { className: 'col-md-4' })
    )
  }
}

export default App
