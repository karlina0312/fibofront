/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Row, Col, Spin } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import { BaseResponse } from 'models'
import { Link, useRouteMatch } from 'react-router-dom'
import { confirm } from 'api'

interface ConfirmProps {}

const Confirm: React.FC<ConfirmProps> = () => {
  const _isMounted = useRef(true)
  const [loading, setLoading] = useState(true)
  const match = useRouteMatch<{ id: string }>('/confirm/:id')
  const [resposen, setResponse] = useState<BaseResponse>()

  useEffect(() => {
    const fetch = async () => {
      if (match?.params.id) {
        setLoading(true)
        const config: AxiosRequestConfig = {
          baseURL: process.env.REACT_APP_BACK_URL,
          url: `auth/confirm/${match.params.id}`,
        }

        try {
          const responseInstance = await axios(config)
          const response = responseInstance.data as BaseResponse
          setResponse(response)
          setLoading(false)
          if (response.status_code !== 0) {
            return null
          }
          return response.body || false
        } catch (err) {
          setLoading(false)
          return null
        }
      }

      return null
    }

    fetch()
    return () => {
      _isMounted.current = false
    }
  }, [match])

  console.log(resposen)

  return (
    <Row align="middle" style={{ textAlign: 'center' }}>
      <Col span={12} style={{ margin: 'auto', marginTop: 150 }}>
        <Alert
          message={
            loading ? (
              <Spin />
            ) : (
              <Row style={{ padding: '50px 0px' }} className="text-center">
                <Col span={24}>
                  <h2 className="text-danger">
                    {resposen?.status_code !== 0 ? resposen?.error_msg : 'Таны и-мэйл хаяг амжилттай баталгаажлаа.'}
                  </h2>

                  <div className="mt-5">
                    <Link to="/" className="utils__link--blue utils__link--underlined">
                      Нүүр хуудас
                    </Link>
                  </div>
                </Col>
              </Row>
            )
          }
          type={resposen?.status_code !== 0 ? 'error' : 'success'}
        />
      </Col>
    </Row>
  )
}

export default Confirm
