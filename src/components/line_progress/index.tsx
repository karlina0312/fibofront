import React from 'react'
import { Progress, Col } from 'antd'
import { FormattedMessage } from 'react-intl'

const LineProgress: React.FC<{ name: string; used: number; limit: number; prefix?: string; format?: Function }> = ({
  name,
  used,
  limit,
  prefix,
  format,
}) => (
  <Col xs={24} sm={24} md={12}>
    <div className="flex row jsb ac">
      <span>
        <FormattedMessage id={name} />
      </span>
      <span>
        {format ? `${format(used)} / ${format(limit)}` : `${used} / ${limit}`} {prefix && prefix}
      </span>
    </div>
    <Progress strokeColor="#ce201f" showInfo={false} percent={(used / limit) * 100} />
  </Col>
)

export default LineProgress
