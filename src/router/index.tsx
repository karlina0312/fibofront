import { Loading } from 'components'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import Layout from 'layouts'
import { NotAuthorized, NotFound } from 'pages/errors'
import React from 'react'
import Loadable from 'react-loadable'
import { Redirect, Route, Switch } from 'react-router-dom'

const LoadableLoader = (loader: any) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loading fill={false} />,
  })

interface RouteInterface {
  path: string
  component: React.FC | React.ComponentClass
  exact: boolean
}

const routes: RouteInterface[] = [
  {
    path: '/auth',
    component: LoadableLoader(() => import('pages/auth')),
    exact: true,
  },
  {
    path: '/dashboard',
    component: LoadableLoader(() => import('pages/dashboard')),
    exact: true,
  },
  {
    path: '/credentials',
    component: LoadableLoader(() => import('pages/credential')),
    exact: true,
  },
  {
    path: '/confirm/:id',
    component: LoadableLoader(() => import('pages/confirm')),
    exact: true,
  },
]

interface RouterProps {
  history: History
}

const Router: React.FC<RouterProps> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
          ))}
          <Route exact path="403" component={NotAuthorized} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  )
}

export default Router
