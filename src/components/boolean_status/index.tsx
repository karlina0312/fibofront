import React from 'react'
import { Tag } from 'antd'
import { AvailableStatus, DownStatus } from 'configs'
import { useIntl } from 'react-intl'

interface BooleanStatusProps {
  status: boolean
  falseText?: string
  trueText?: string
}

const BooleanStatus: React.FC<BooleanStatusProps> = ({ status, falseText, trueText }) => {
  const intl = useIntl()
  const color = status ? AvailableStatus : DownStatus

  return (
    <Tag color={color} className="capitalize">
      {status ? trueText || intl.formatMessage({ id: 'true' }) : falseText || intl.formatMessage({ id: 'false' })}
    </Tag>
  )
}

export default BooleanStatus
