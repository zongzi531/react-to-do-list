import { Component, createElement as e } from 'react'
import Title from '../components/Title'
import ListWrapper from '../components/ListWrapper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { TITLE, AUTHOR } from '../config'

class Home extends Component<{}, {}> {
  public render() {
    const titleProps = {
      title: TITLE,
      author: AUTHOR
    }
    return e(
      'div',
      { id: 'app', className: 'row'},
      e('div', { className: 'col-md-4' }),
      e('div', { className: 'col-md-4' }, e(Title, { ...titleProps }), e(ListWrapper)),
      e('div', { className: 'col-md-4' })
    )
  }
}

export default DragDropContext(HTML5Backend)(Home)
