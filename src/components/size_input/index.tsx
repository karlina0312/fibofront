import { Input, Slider } from 'antd'
import cssClass from 'classnames'
import React, { useState } from 'react'
import styles from './styles.module.scss'

interface Props {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  className?: string
  suffix?: React.ReactNode
  dots?: boolean
}

const SizeInput: React.FC<Props> = React.forwardRef<Input, Props>(
  ({ value = 0, onChange, min, max, className, suffix = 'GB', dots = false }, ref) => {
    const [data, setData] = useState<number>(value)
    return (
      <Input.Group compact className={cssClass('flex row ant-input p_l_2', className)}>
        <Slider
          dots={dots}
          style={{ flex: 1 }}
          min={min}
          max={max}
          value={data}
          onChange={(val: number) => {
            setData(val)
            if (onChange) {
              onChange(val)
            }
          }}
        />
        <Input
          ref={ref}
          min={min}
          max={max}
          type="number"
          value={data}
          suffix={suffix}
          style={{ width: 128 }}
          className={cssClass('m_l_2', styles.numberInput)}
          onChange={(val) => {
            const tmp = parseInt(val.target.value, 10)
            setData(tmp)
            if (onChange) {
              onChange(tmp)
            }
          }}
        />
      </Input.Group>
    )
  }
)

export default SizeInput
