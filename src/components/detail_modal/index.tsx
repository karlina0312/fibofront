import { Button, Drawer } from 'antd'
import { DrawerProps } from 'antd/lib/drawer'
import { useWindow } from 'hooks'
import React from 'react'
import { useIntl } from 'react-intl'
import { CheckCircleOutlined } from '@ant-design/icons'

interface ModalComponentProps extends DrawerProps {
  okText?: React.ReactNode
  onCancel: Function
}

const ModalComponent: React.FC<ModalComponentProps> = ({ title, okText, onCancel, children, ...props }) => {
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
      width={calcWidth()}
      title={<strong>{title}</strong>}
      onClose={() => {
        onCancel()
      }}
      footer={
        <Button
          block
          key="ok"
          type="primary"
          onClick={() => {
            onCancel()
          }}
          icon={<CheckCircleOutlined />}
        >
          <>{okText || intl.formatMessage({ id: 'ok' })}</>
        </Button>
      }
      {...props}
    >
      {children}
    </Drawer>
  )
}

export default ModalComponent
