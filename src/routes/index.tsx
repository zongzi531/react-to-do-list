import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import Home from '../views/Home'
import Register from '../views/Register'
import SignIn from '../views/SignIn'

const routes: RouteProps[] = [
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

export default class Routes extends React.Component<{}, {}> {
  public render () {
    return (
      <Router>
        <Switch>
          {
            routes.map((item, index) => {
              return (<Route {...item} key={index} />)
            })
          }
          <Redirect {...redirect} />
        </Switch>
      </Router>
    )
  }
}