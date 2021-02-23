/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import Icon, { AppstoreFilled } from '@ant-design/icons'
import ProLayout, { MenuDataItem, Settings } from '@ant-design/pro-layout'
import { ReactComponent as AWSIcon } from 'assets/icons/aws.svg'
import { ReactComponent as K8sIcon } from 'assets/icons/kubernetes.svg'
import logo from 'assets/logo.svg'
import { PoweredBy } from 'components'
import defaultSettings from 'configs'
import { ReduxInterface, UserInterface } from 'models'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Link, RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import styles from './styles.module.scss'
import RightContent from './TopRight'

interface MainLayoutProps extends RouteComponentProps<any> {}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  const intl = useIntl()
  const history = useHistory()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [settings] = useState<Partial<Settings>>({
    ...defaultSettings,
    fixedHeader: true,
    fixSiderbar: true,
  })

  const menuDataRender = () => {
    const menu: MenuDataItem[] = [
      {
        key: 'dashboard',
        name: intl.formatMessage({ id: 'menu.dashboard' }),
        path: '/dashboard',
        icon: <AppstoreFilled style={{ fontSize: 16 }} />,
      },
    ]

    return menu
  }

  return (
    <ProLayout
      logo={logo}
      siderWidth={280}
      disableMobile={false}
      onMenuHeaderClick={() => history.push('/')}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/" className="left-logo">
          {logoDom}
          {titleDom}
        </Link>
      )}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      menuDataRender={menuDataRender}
      menuItemRender={(menuItemProps, defaultDom) => {
        return menuItemProps.isUrl ? defaultDom : <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
      }}
      rightContentRender={() => <RightContent />}
      footerRender={() => (
        <div className={styles.footer}>
          <PoweredBy color="black" />
        </div>
      )}
      contentStyle={{ overflow: 'auto', height: 'calc(100vh - 125px)', padding: 12 }}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  )
}

export default withRouter(MainLayout)
