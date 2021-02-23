import { Form, notification, Select } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { createAwsBillingAlarm, listAwsSNSTopic } from 'api'
import { FormInput, ModalForm, Loader } from 'components'
import { CloseAwaitMS } from 'configs'
import { AwsSNSTopic } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

interface AlarmCreateProps {
  visible: boolean
  onOk: Function
  onCancel: Function
}

type operatorType =
  | 'GreaterThanOrEqualToThreshold'
  | 'GreaterThanThreshold'
  | 'LessThanThreshold'
  | 'LessThanOrEqualToThreshold'
  | 'LessThanLowerOrGreaterThanUpperThreshold'
  | 'LessThanLowerThreshold'
  | 'GreaterThanUpperThreshold'
const operatorValues: operatorType[] = [
  'GreaterThanOrEqualToThreshold',
  'GreaterThanThreshold',
  'LessThanThreshold',
  'LessThanOrEqualToThreshold',
  'LessThanLowerOrGreaterThanUpperThreshold',
  'LessThanLowerThreshold',
  'GreaterThanUpperThreshold',
]

const AwsAlarmCreate: React.FC<AlarmCreateProps> = ({ visible, onOk, onCancel }) => {
  const intl = useIntl()
  const _isMounted = useRef(true)
  const [form] = Form.useForm()
  const [vis, setVis] = useState<boolean>(visible)
  const [fetchLoading, setFetchLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [snsTopics, setSnsTopics] = useState<AwsSNSTopic[]>([])

  useEffect(() => {
    fetchData()
    return () => {
      _isMounted.current = false
    }
  }, [])

  const fetchData = async () => {
    setFetchLoading(true)
    const response = await listAwsSNSTopic({})
    if (_isMounted.current) {
      if (response && response.Topics) {
        setSnsTopics(response.Topics as AwsSNSTopic[])
      }
      setFetchLoading(false)
    }
  }

  const handleFinish = async (values: Store) => {
    setLoading(true)
    const success = await createAwsBillingAlarm({ data: values })
    setLoading(false)
    if (success) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: `${values.name} alarm is created.`,
      })
      form.resetFields()
      setVis(false)
      setTimeout(() => {
        onOk(values.keyPairName)
      }, CloseAwaitMS)
    }
  }

  return (
    <ModalForm
      visible={vis}
      loading={loading}
      title={<FormattedMessage id="alarm.create_title" />}
      formName="alarm_create_form"
      okText={<FormattedMessage id="create" />}
      cancelText={<FormattedMessage id="cancel" />}
      onCancel={() => {
        setVis(false)
        setTimeout(() => {
          onCancel()
        }, CloseAwaitMS)
      }}
    >
      <Loader loading={fetchLoading}>
        <Form form={form} name="alarm_create_form" layout="vertical" labelAlign="left" onFinish={handleFinish}>
          <FormInput
            required
            hasLabel
            name="name"
            type="input"
            label={<FormattedMessage id="name" />}
            placeholder={intl.formatMessage({ id: 'name' })}
          />
          <FormInput
            required
            hasLabel
            name="desc"
            type="textarea"
            label={<FormattedMessage id="description" />}
            placeholder={intl.formatMessage({ id: 'description' })}
          />
          <FormInput required hasLabel name="operator" label={intl.formatMessage({ id: 'billing.operator' })}>
            <Select placeholder={intl.formatMessage({ id: 'billing.operator' })}>
              {operatorValues.map((op) => (
                <Select.Option key={op} value={op}>
                  {op}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
          <FormInput required hasLabel name="alarm_actions" label={intl.formatMessage({ id: 'billing.alarm_actions' })}>
            <Select mode="multiple" placeholder={intl.formatMessage({ id: 'billing.alarm_actions' })}>
              {snsTopics.map((topic) => (
                <Select.Option key={topic.TopicArn} value={topic.TopicArn}>
                  {topic.TopicArn}
                </Select.Option>
              ))}
            </Select>
          </FormInput>
          <FormInput
            required
            hasLabel
            min={0}
            name="period"
            type="number"
            className="w-fill"
            label={<FormattedMessage id="billing.period" />}
            placeholder={intl.formatMessage({ id: 'billing.period' })}
          />
          <FormInput
            required
            hasLabel
            min={0}
            prefix="$"
            type="number"
            name="threshold"
            className="w-fill"
            label={<FormattedMessage id="billing.threshold" />}
            placeholder={intl.formatMessage({ id: 'billing.threshold' })}
          />
        </Form>
      </Loader>
    </ModalForm>
  )
}

export default AwsAlarmCreate
