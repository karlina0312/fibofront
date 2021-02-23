import { Row } from 'antd'
import cssClass from 'classnames'
import React from 'react'

interface KeyValueProps {
  title: React.ReactNode
  vertical?: boolean
  value: React.ReactNode
  className?: string
}

const KeyValue = ({ title, value, vertical = false, className }: KeyValueProps) => {
  return (
    <Row>
      <span className={cssClass('capitalize bold m_b p_r', className)}>{title}:</span>
      <span className={cssClass(vertical ? 'w-fill' : '', className)}>{value}</span>
    </Row>
  )
}

export default KeyValue
