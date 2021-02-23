import React from 'react'
import { Spin } from 'antd'
import styles from './styles.module.scss'

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean
  fill?: boolean
  autoHeigth?: boolean
}

const Loader = ({ loading, children, fill = false, autoHeigth = false }: LoaderProps) => {
  return (
    <>
      {loading ? (
        <div className={styles.loader_container} style={autoHeigth ? {} : { height: fill ? '100%' : '230px' }}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Loader
