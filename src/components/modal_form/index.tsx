import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Row } from 'antd'
import { DrawerProps } from 'antd/lib/drawer'
import { useWindow } from 'hooks'
import React from 'react'
import { useIntl } from 'react-intl'

interface ModalComponentProps extends DrawerProps {
  formName: string
  loading: boolean
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  onCancel: Function
  okIcon?: React.ReactNode
  okDisable?: boolean
  cancelIcon?: React.ReactNode
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  okText,
  okIcon,
  children,
  cancelIcon,
  cancelText,
  loading,
  onCancel,
  formName,
  okDisable = false,
  ...props
}) => {
  const intl = useIntl()
  const [width] = useWindow()
  const calcWidth = () => {
    if (width >= 1200) {
      return '30%'
    }
    if (width >= 768) {
      return '50%'
    }
    return '100%'
  }
  return (
    <Drawer
      maskClosable
      width={calcWidth()}
      title={<strong>{title}</strong>}
      placement="right"
      onClose={() => {
        onCancel()
      }}
      footer={
        <Row gutter={12}>
          <Col span={12}>
            <Button
              block
              key="cancel"
              type="default"
              icon={cancelIcon || <CloseCircleOutlined />}
              onClick={() => {
                onCancel()
              }}
            >
              <>{cancelText || intl.formatMessage({ id: 'cancel' })}</>
            </Button>
          </Col>
        </Row>
      }
      {...props}
    >
      {children}
    </Drawer>
  )
}

export default ModalComponent
