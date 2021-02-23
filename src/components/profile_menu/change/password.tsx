import { LockOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons'
import { Button, Form, notification, Alert, Card } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FormInput } from 'components'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { register } from 'api'
import styles from './styles.module.scss'

interface passwordProps {}

const password: React.FC<passwordProps> = () => {
  const intl = useIntl()
  // const { loading } = useSelector<ReduxInterface, UserInterface>((state: ReduxInterface) => state.UserReducer)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleRegister = async (values: Store) => {
    setLoading(true)
    const sc = await register({
      data: values,
    })
    setLoading(false)
    if (sc) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: intl.formatMessage({ id: 'registered' }),
      })
      form.resetFields()
      setSuccess(true)
    }
  }

  return (
    <Card bordered={false}>
      <Form
        form={form}
        name="login_form"
        labelAlign="left"
        layout="vertical"
        className={styles.form}
        onFinish={handleRegister}
        hideRequiredMark
      >
        {success && (
          <Alert showIcon type="success" message={intl.formatMessage({ id: 'registered' })} className="m_b_1" />
        )}
        <FormInput
          required
          name="password"
          type="password"
          className={styles.input}
          prefix={<LockOutlined />}
          label={intl.formatMessage({ id: 'password' })}
          placeholder={intl.formatMessage({ id: 'password' })}
        />
        <FormInput
          required
          name="repassword"
          type="password"
          className={styles.input}
          prefix={<LockOutlined />}
          label={intl.formatMessage({ id: 'password' })}
          placeholder={intl.formatMessage({ id: 'password' })}
        />
        <Form.Item className={styles.buttonContainer}>
          <Button block className={styles.button} type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id="password" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default password
