import { Component, createElement as e } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../views/Home'
import Register from '../views/Register'
import SignIn from '../views/SignIn'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/register',
    component: Register
  }
]

const redirect = {
  path: '*',
  to: '/signin'
}

export default class Routes extends Component<{}, {}> {
  public render() {
    return e(
      Router, {},
      e(Switch, {},
        routes.map((item, index) => {
          return e(Route, { ...item, key: index })
        }),
        e(Redirect, { ...redirect })
      )
    )
  }
}