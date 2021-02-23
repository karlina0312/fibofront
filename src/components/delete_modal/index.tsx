import { Button, Form, Input, Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { Confirm } from 'configs'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'

interface ModalComponentProps extends ModalProps {
  selectedNames: string
  loading: boolean
  onDelete: Function
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  okText,
  cancelText,
  loading,
  onCancel,
  selectedNames,
  onDelete,
  ...props
}) => {
  const intl = useIntl()
  const [form] = Form.useForm()

  return (
    <Modal
      maskClosable
      title={<strong>{title}</strong>}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="default" onClick={onCancel} icon={<CloseCircleOutlined />}>
          <>{cancelText || intl.formatMessage({ id: 'cancel' })}</>
        </Button>,
        <Button
          loading={loading}
          form="delete_modal_form"
          type="primary"
          key="submit"
          htmlType="submit"
          icon={<DeleteOutlined />}
        >
          <>{okText || intl.formatMessage({ id: 'delete' })}</>
        </Button>,
      ]}
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="delete_modal_form"
        labelAlign="left"
        onFinish={() => {
          form.resetFields()
          onDelete()
        }}
      >
        <p>
          <FormattedMessage id="delete_section" values={{ name: selectedNames, confirm: Confirm }} />
        </p>
        <Form.Item
          name="confirm"
          className="form_last_item"
          rules={[
            {
              validator: async (_rule, value) => {
                if (value !== Confirm) {
                  throw new Error(intl.formatMessage({ id: 'valid.delete' }, { confirm: Confirm }))
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalComponent
