/* eslint-disable camelcase */
import { FireTwoTone, SyncOutlined } from '@ant-design/icons'
import { Form, Input, notification, Select, Tag, Row, Col } from 'antd'
import { listAwsCredential, updateAwsCredentialDefault } from 'api'
import { CloseAwaitMS } from 'configs'
import { AwsCredential, ReduxInterface, UserInterface } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Store } from 'antd/lib/form/interface'
import ModalForm from '../modal_form'
import FormInput from '../form_input'
import Credential from './credential'
// import Regions from './regions'

const CredentialSelector = () => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const _isMounted = useRef<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [awsCredentials, setAwsCredentials] = useState<AwsCredential[]>([])
  const { aws_region, aws_credentials } = useSelector<ReduxInterface, UserInterface>(
    (state: ReduxInterface) => state.UserReducer
  )

  useEffect(() => {
    fetchCredential()
    return () => {
      _isMounted.current = false
    }
  }, [])

  const fetchCredential = async () => {
    setLoading(true)
    const tmpAwsCredentials = (await listAwsCredential({})) as AwsCredential[]
    if (_isMounted.current) {
      setAwsCredentials(tmpAwsCredentials)
      setLoading(false)
    }
  }

  const handleFinish = async (values: Store) => {
    setLoading(true)
    const success = await updateAwsCredentialDefault({
      data: values,
    })
    setLoading(false)
    if (success && _isMounted.current) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: `project changed.`,
      })
      setTimeout(() => {
        window.location.reload(false)
      }, CloseAwaitMS)
    }
  }

  return (
    <>
      <strong style={{ padding: '2px 6px 2px 0' }}>
        <FormattedMessage id="aws" />:
      </strong>
      <Tag
        color="red"
        onClick={() => {
          setVisible(true)
        }}
      >
        {loading ? (
          <SyncOutlined spin />
        ) : (
          <>
            <strong>
              <FormattedMessage id="credential" />:
            </strong>{' '}
            {aws_credentials?.description || '-'}
            {/* <strong>
              <FormattedMessage id="region" />:
            </strong>{' '}
            {aws_region || '-'} */}
          </>
        )}
      </Tag>
      <ModalForm
        visible={visible}
        loading={loading}
        title={<FormattedMessage id="aws_credential_change" />}
        formName="aws_credential_change_from"
        // okText={<FormattedMessage id="update" />}
        cancelText={<FormattedMessage id="cancel" />}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form
          form={form}
          name="aws_credential_change_from"
          layout="vertical"
          labelAlign="left"
          onFinish={handleFinish}
          initialValues={{ credential_id: aws_credentials?.id, region_code: aws_region }}
        >
          <Credential />
          {/* <FormInput
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
          /> */}
          {/* <FormInput required hasLabel label={intl.formatMessage({ id: 'credential' })} name="credential_id">
            <Select placeholder={intl.formatMessage({ id: 'credential' })}>
              {awsCredentials.map((credential) => (
                <Select.Option key={credential.id} value={credential.id}>
                  {credential.description}
                </Select.Option>
              ))}
            </Select>
          </FormInput> */}
          {/* <FormInput required hasLabel label={intl.formatMessage({ id: 'region' })} name="region_code">
            <Select placeholder={intl.formatMessage({ id: 'region' })}>
              {Regions.map((region) => (
                <Select.Option key={region.name} value={region.value}>
                  {region.name}
                </Select.Option>
              ))}
            </Select>
          </FormInput> */}
        </Form>
      </ModalForm>
    </>
  )
}

export default CredentialSelector
