import { Loading } from 'components'
import configs from 'configs'
import { Location } from 'history'
import { ReduxInterface, UserInterface } from 'models'
import NProgress from 'nprogress'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import AuthLayout from './auth'
import MainLayout from './main'
import PublicLayout from './public'

let previousPath: string = ''
let prevLocation: Location | null = null
let isAuthLayout: boolean = false

interface LayoutProps extends RouteComponentProps<any> {}

const Layout: React.FC<LayoutProps> = ({ children, location }) => {
  const { authorized, loading } = useSelector<ReduxInterface, UserInterface>(
    (state: ReduxInterface) => state.UserReducer
  )
  const { pathname, search } = location
  const currentPath = pathname + search

  useEffect(() => {
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
    prevLocation = location
  }, [location])

  if (currentPath !== previousPath) {
    NProgress.start()
  }

  setTimeout(() => {
    NProgress.done()
    previousPath = currentPath
  }, 300)

  const GetLayout = () => {
    if (pathname === '/') {
      isAuthLayout = false
      return PublicLayout
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      isAuthLayout = true
      return AuthLayout
    }
    if (/^\/public(?=\/|$)/i.test(pathname)) {
      isAuthLayout = false
      return PublicLayout
    }
    if (/^\/confirm(?=\/|$)/i.test(pathname)) {
      isAuthLayout = true
      return PublicLayout
    }

    isAuthLayout = false
    return MainLayout
  }

  const Container = GetLayout()

  const BootstrappedLayout = () => {
    if (loading && !authorized && !isAuthLayout) {
      return (
        <div className="w-fill h-fill">
          <Loading />
        </div>
      )
    }
    if (pathname !== '/confirm') {
      if (!isAuthLayout && !authorized) {
        return <Redirect to="/auth" />
      }
      if (isAuthLayout && authorized) {
        return <Redirect to="/dashboard" />
      }
    }
    return <Container>{children}</Container>
  }

  return (
    <>
      <Helmet titleTemplate={`%s - ${configs.title}`} title="" />
      {BootstrappedLayout()}
    </>
  )
}

export default withRouter(Layout)
