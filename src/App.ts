import { Component, createElement as e } from 'react'
import Routes from './routes'

export default class App extends Component<{}, {}> {
  public render() {
    return e(Routes)
  }
}
