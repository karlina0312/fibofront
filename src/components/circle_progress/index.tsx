import React from 'react'
import { Progress } from 'antd'
import { FormattedMessage } from 'react-intl'

const CircleProgress: React.FC<{ used: number; all: number; title: string; prefix?: string; format?: Function }> = ({
  used,
  all,
  title,
  prefix,
  format,
}) => (
  <div className="flex col jc ac">
    <Progress type="circle" percent={Math.ceil((used / all) * 10000) / 100} format={(p) => `${p}%`} />
    <h3>
      <FormattedMessage id={title} />
    </h3>
    <span>
      {format ? `${format(used)} / ${format(all)}` : `${used} / ${all}`} {prefix && prefix}
    </span>
  </div>
)

export default CircleProgress
