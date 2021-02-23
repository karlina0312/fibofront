import { Col, Row } from 'antd'
import { PtmInstantVectors } from 'models'
import React from 'react'
import { getHostnames } from 'utils'
import styles from './styles.module.scss'

interface MonitorNumberCardProps {
  isntantVector: PtmInstantVectors[]
  format?: Function
  hostnames?: { name: string; value: string }[]
}

const MonitorNumberGrid: React.FC<MonitorNumberCardProps> = ({ isntantVector, format, hostnames }) => (
  <div>
    <Row className={styles.numberContainer} gutter={12} justify="center">
      {isntantVector.map((vector) => (
        <Col key={vector.metric.instance} className={styles.col}>
          <span className={styles.span}>{format ? format(vector.value[1]) : vector.value[1]}</span>
          {vector.metric && vector.metric.instance && (
            <div className={styles.title}>
              {hostnames ? getHostnames(vector.metric.instance, hostnames) : vector.metric.instance}
            </div>
          )}
        </Col>
      ))}
    </Row>
  </div>
)

export default MonitorNumberGrid
