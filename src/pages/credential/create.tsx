import { Form, notification, Select } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { createAwsCredential } from 'api'
import { FormInput, ModalForm } from 'components'
import { CloseAwaitMS } from 'configs'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

interface CredentialCreateProps {
  visible: boolean
  onOk: Function
  onCancel: Function
}

const CredentialCreate: React.FC<CredentialCreateProps> = ({ visible, onOk, onCancel }) => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const [vis, setVis] = useState<boolean>(visible)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFinish = async (values: Store) => {
    setLoading(true)
    const success = await createAwsCredential({
      data: values,
    })
    setLoading(false)
    if (success) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: `${values.credential_name} credential is created.`,
      })
      form.resetFields()
      setVis(false)
      setTimeout(() => {
        onOk(values.credential_name)
      }, CloseAwaitMS)
    }
  }

  return (
    <ModalForm
      visible={vis}
      loading={loading}
      title={intl.formatMessage({ id: 'credential.create_title' })}
      formName="credential_create_form"
      onCancel={() => {
        setVis(false)
        setTimeout(() => {
          onCancel()
        }, CloseAwaitMS)
      }}
    >
      <Form form={form} name="credential_create_form" layout="vertical" labelAlign="left" onFinish={handleFinish}>
        <FormInput
          required
          hasLabel
          name="description"
          label={intl.formatMessage({ id: 'description' })}
          placeholder={intl.formatMessage({ id: 'description' })}
          type="input"
        />
        <FormInput
          required
          hasLabel
          name="access_key"
          label={intl.formatMessage({ id: 'access_key' })}
          placeholder={intl.formatMessage({ id: 'access_key' })}
          type="input"
        />
        <FormInput
          required
          hasLabel
          name="secret_key"
          label={intl.formatMessage({ id: 'secret_key' })}
          placeholder={intl.formatMessage({ id: 'secret_key' })}
          type="input"
        />
      </Form>
    </ModalForm>
  )
}

export default CredentialCreate
