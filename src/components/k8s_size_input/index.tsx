import { Input, InputNumber, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

const SizeInput: React.FC<Props> = React.forwardRef<Input, Props>(({ value, onChange }, ref) => {
  const intl = useIntl()
  const [data, setData] = useState<number | undefined>()
  const [format, setFormat] = useState<string | undefined>()

  useEffect(() => {
    if (value) {
      if (value.substr(value.length - 1) === 'i') {
        setData(Number(value.substring(0, value.length - 2)))
        setFormat(value.substr(value.length - 2))
      } else {
        setData(Number(value.substring(0, value.length - 1)))
        setFormat(value.substr(value.length - 1))
      }
    } else {
      setFormat('Mi')
    }
  }, [value])

  return (
    <Input.Group compact className="flex row">
      <InputNumber
        ref={ref}
        value={data}
        style={{ flex: 3 }}
        onChange={(val) => {
          setData(val as number)
          if (onChange) {
            onChange(`${val}Mi`)
          }
        }}
        placeholder={intl.formatMessage({ id: 'size' })}
      />
      <Select
        value={format}
        style={{ flex: 1 }}
        onChange={(val) => {
          setFormat(val)
          if (onChange) {
            onChange(`${data || 0}${val && val}`)
          }
        }}
      >
        <Select.Option value="Mi">M</Select.Option>
        <Select.Option value="Gi">G</Select.Option>
        <Select.Option value="Ti">T</Select.Option>
      </Select>
    </Input.Group>
  )
})

export default SizeInput
