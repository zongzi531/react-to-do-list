import { Component, createElement as e } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../views/Home'
import Register from '../views/Register'
import SignIn from '../views/SignIn'

export default class Routes extends Component<{}, {}> {
  public render() {
    return e(
      Router, {},
      e(
        'div', {},
        e(Route, { exact: true, path: '/signin', component: SignIn }),
        e(Route, { path: '/register', component: Register }),
        e(Route, { path: '/home', component: Home })
      )
    )
  }
}