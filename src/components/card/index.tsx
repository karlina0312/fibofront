import { Card } from 'antd'
import { CardProps } from 'antd/es/card'
import cssClass from 'classnames'
import React from 'react'
import styles from './styles.module.scss'

interface CardComponentProps extends CardProps {}

const CardComponent: React.FC<CardComponentProps> = ({ children, className, ...props }) => (
  <Card bordered={false} className={cssClass(styles.card, 'm_b_2', className)} {...props}>
    {children}
  </Card>
)

export default CardComponent
