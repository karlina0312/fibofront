import { PoweredBy } from 'components'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styles from './styles.module.scss'

const AuthLayout: React.FC<RouteComponentProps<any>> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.header} />
    <div className={styles.content}>{children}</div>
    <div className={styles.footer}>
      <PoweredBy />
    </div>
  </div>
)

export default withRouter(AuthLayout)
