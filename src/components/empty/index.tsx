import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './styles.module.scss'

const Empty = () => {
  return (
    <div className={styles.container}>
      <FormattedMessage id="empty" />
    </div>
  )
}

export default Empty
