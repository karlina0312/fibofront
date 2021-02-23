import { Card } from 'antd'
import { CardProps } from 'antd/es/card'
import cssClass from 'classnames'
import React from 'react'
import styles from './styles.module.scss'

interface MonitorWidgetProps extends CardProps {}

const MonitorWidget: React.FC<MonitorWidgetProps> = ({ title, children, className, loading = false, ...props }) => (
  <Card bordered={false} loading={loading} className={cssClass(styles.card, 'm_b_2', className)} {...props}>
    <div className={styles.title}>{title}</div>
    <div className={styles.body}>{children}</div>
  </Card>
)

export default MonitorWidget
