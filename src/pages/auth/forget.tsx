import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Card } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { FormInput } from 'components'

import { ReduxInterface, UserInterface } from 'models'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/user/reducers'
import forgetpassword from './dist/forgetpassword'
import styles from './styles.module.scss'

interface ForgetProps {}

const Forgetpassword: React.FC<ForgetProps> = () => {
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
        name="forget_form"
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
        <Form.Item className={styles.buttonContainer}>
          <Button block className={styles.button} type="primary" htmlType="submit" loading={loading}>
            <FormattedMessage id="forgetpasswortd" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default forgetpassword
