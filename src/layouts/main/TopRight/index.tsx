import { Divider } from 'antd'
import { CredentialSelector, LanguageSelector, ProfileMenu } from 'components'
import React from 'react'
import styles from './styles.module.scss'

interface TopRightProps {}

const TopRight: React.FC<TopRightProps> = () => {
  return (
    <div className={styles.container}>
      <CredentialSelector />
      <Divider type="vertical" />
      <LanguageSelector />
      <Divider type="vertical" />
      <ProfileMenu />
    </div>
  )
}

export default TopRight
