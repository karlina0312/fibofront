import { Tabs } from 'antd'
import { Card } from 'components'
import React from 'react'
import configs from 'configs'
import { ReactComponent as Logo } from 'assets/logo.svg'
import { useIntl } from 'react-intl'
import Signin from './signin'
import Signup from './signup'
import styles from './styles.module.scss'

interface SigninProps {}

const { TabPane } = Tabs

const Auth: React.FC<SigninProps> = () => {
  const intl = useIntl()

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Logo width="40px" height="40px" />
        <h1 className={styles.title}>{configs.title}</h1>
      </div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={intl.formatMessage({ id: 'signin' })} key="1">
          <Signin />
        </TabPane>
        <TabPane tab={intl.formatMessage({ id: 'signup' })} key="2">
          <Signup />
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default Auth
