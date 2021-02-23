import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

interface ModalComponentProps extends ModalProps {
  selectedNames: string
  loading: boolean
  onConfirm: Function
  okIcon?: React.ReactNode
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  okText,
  okIcon,
  cancelText,
  loading,
  onCancel,
  selectedNames,
  onConfirm,
  ...props
}) => {
  const intl = useIntl()
  return (
    <Modal
      title={<strong>{title}</strong>}
      onCancel={onCancel}
      maskClosable={false}
      footer={[
        <Button key="cancel" type="default" onClick={onCancel} icon={<CloseCircleOutlined />}>
          <>{cancelText || intl.formatMessage({ id: 'cancel' })}</>
        </Button>,
        <Button
          loading={loading}
          type="primary"
          key="submit"
          onClick={() => {
            onConfirm()
          }}
          icon={okIcon || <CheckCircleOutlined />}
        >
          <>{okText || intl.formatMessage({ id: 'ok' })}</>
        </Button>,
      ]}
      {...props}
    >
      <p>
        <FormattedMessage id="confirm_section" values={{ name: selectedNames }} />
      </p>
    </Modal>
  )
}

export default ModalComponent
