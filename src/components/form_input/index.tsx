import { Col, Form, Input, InputNumber, Row, Switch } from 'antd'
import { Rule } from 'antd/lib/form'
import React from 'react'
import { FormattedMessage } from 'react-intl'

type NamePath = string | number | (string | number)[]

interface FormInputProps {
  type?: 'input' | 'textarea' | 'switch' | 'password' | 'confirm_password' | 'number' | 'email' | 'phone'
  name: NamePath
  hasLabel?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  children?: React.ReactNode
  showLimits?: boolean
  label: React.ReactNode
  wrapClassName?: string
  className?: string
  required?: boolean
  rules?: Rule[]
  rows?: number
  dependencies?: NamePath[]
  min?: number
  max?: number
  valuePropName?: string
  placeholder?: string
}

const FormInput = ({
  min,
  max,
  name,
  label,
  type,
  prefix,
  suffix,
  className,
  wrapClassName,
  children,
  dependencies,
  valuePropName,
  placeholder,
  rows = 5,
  rules = [],
  showLimits = false,
  hasLabel = false,
  required = false,
}: FormInputProps) => {
  const renderInput = () => {
    switch (type) {
      case 'input':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: <FormattedMessage id="valid.required_text" />,
              },
              ...rules,
            ]}
          >
            <Input placeholder={placeholder} prefix={prefix} suffix={suffix} className={className} />
          </Form.Item>
        )
      case 'textarea':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: <FormattedMessage id="valid.required_text" />,
              },
              ...rules,
            ]}
          >
            <Input.TextArea rows={rows} placeholder={placeholder} className={className} />
          </Form.Item>
        )
      case 'switch':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            valuePropName="checked"
            rules={[
              {
                required,
                message: <FormattedMessage id="valid.required" />,
              },
              ...rules,
            ]}
          >
            <Switch className={className} />
          </Form.Item>
        )
      case 'password':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: <FormattedMessage id="valid.required_password" />,
              },
              ...rules,
            ]}
          >
            <Input.Password placeholder={placeholder} prefix={prefix} className={className} />
          </Form.Item>
        )
      case 'confirm_password':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                whitespace: false,
                message: <FormattedMessage id="valid.required_password" />,
              },
              ...rules,
            ]}
          >
            <Input.Password
              placeholder={placeholder}
              type="Confirm Password"
              prefix={prefix}
              suffix={suffix}
              className={className}
            />
          </Form.Item>
        )
      case 'number':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            className={wrapClassName}
            label={
              <Row gutter={12}>
                <Col>{hasLabel ? label : undefined}</Col>
                <Col>
                  <strong>{showLimits && `(${min} < value < ${max})`}</strong>
                </Col>
              </Row>
            }
            rules={[
              {
                required,
                type: 'number',
                message: <FormattedMessage id="valid.required_number" />,
              },
              ...rules,
            ]}
          >
            <InputNumber min={min} max={max} placeholder={placeholder} className={className} />
          </Form.Item>
        )
      case 'phone':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                pattern: /^[1-9]{1}[0-9]{7}$/g,
                message: <FormattedMessage id="valid.phone" />,
              },
              ...rules,
            ]}
          >
            <Input placeholder={placeholder} prefix={prefix} suffix={suffix} className={className} />
          </Form.Item>
        )
      case 'email':
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            label={hasLabel ? label : undefined}
            className={wrapClassName}
            rules={[
              {
                required,
                message: <FormattedMessage id="valid.required" />,
              },
              {
                type: 'email',
                message: <FormattedMessage id="valid.email" />,
              },
              ...rules,
            ]}
          >
            <Input placeholder={placeholder} prefix={prefix} suffix={suffix} className={className} />
          </Form.Item>
        )
      default:
        return (
          <Form.Item
            name={name}
            dependencies={dependencies}
            valuePropName={valuePropName}
            label={hasLabel && (label || <FormattedMessage id={name?.toString()} />)}
            className={wrapClassName}
            rules={[
              {
                required,
                message: <FormattedMessage id="valid.required" />,
              },
              ...rules,
            ]}
          >
            {children}
          </Form.Item>
        )
    }
  }

  return (
    // <FormattedMessage id={name?.toString()} defaultMessage=" ">
    renderInput()
    // </FormattedMessage>
  )
}

export default FormInput
