import { DownOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { AwsCredentailSelector } from 'components'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './styles.module.scss'

interface Props {}

const CredentailSelector: React.FC<Props> = () => {
  const menu = (
    <Menu selectable={false}>
      <Menu.Item className={styles.item}>
        <AwsCredentailSelector />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button size="small" type="primary" icon={<UserSwitchOutlined />}>
        <FormattedMessage id="credential" /> <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default CredentailSelector
