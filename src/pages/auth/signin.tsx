import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Card } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FormInput } from 'components'

import { ReduxInterface, UserInterface } from 'models'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/user/reducers'
import styles from './styles.module.scss'

interface SigninProps {}

const Signin: React.FC<SigninProps> = () => {
  const intl = useIntl()
  const { loading } = useSelector<ReduxInterface, UserInterface>((state: ReduxInterface) => state.UserReducer)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleFinish = (values: Store) => {
    dispatch({
      type: Actions.LOGIN,
      payload: values,
    })
  }

  return (
    <Card bordered={false}>
      <Form
        form={form}
        name="login_form"
        labelAlign="left"
        layout="vertical"
        className={styles.form}
        onFinish={handleFinish}
        hideRequiredMark
      >
        <FormInput
          required
          name="email"
          type="input"
          className={styles.input}
          prefix={<UserOutlined />}
          label={intl.formatMessage({ id: 'email' })}
          placeholder={intl.formatMessage({ id: 'email' })}
        />
        <FormInput
          required
          name="password"
          type="password"
          className={styles.input}
          prefix={<LockOutlined />}
          label={intl.formatMessage({ id: 'password' })}
          placeholder={intl.formatMessage({ id: 'password' })}
        />
        <Form.Item className={styles.buttonContainer}>
          <Button block className={styles.button} type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id="signin" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Signin
