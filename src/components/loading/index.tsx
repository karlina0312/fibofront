import React from 'react'
import { Spin } from 'antd'
import styles from './styles.module.scss'

interface Props {
  fill?: boolean
}

const Loading: React.FC<Props> = ({ fill = true }) => (
  <div className={styles.container} style={{ width: fill ? '100vw' : '100%', height: fill ? '100vh' : '100%' }}>
    <Spin />
  </div>
)

export default Loading
