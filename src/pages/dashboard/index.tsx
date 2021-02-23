import { Col, Row } from 'antd'
import React from 'react'
import { AWS } from './components'

const Dashboard: React.FC<any> = () => {
  return (
    <Row gutter={24}>
      <Col xs={24} sm={24} xl={24} className="m_b">
        <AWS />
      </Col>
    </Row>
  )
}

export default Dashboard
