import React, { useRef, useState, useEffect } from 'react'
import { getQuotaSet } from 'api'
import { QuotaSetResponse } from 'models'
import { PageLayout, LineProgress } from 'components'
import { FormattedMessage } from 'react-intl'
import { Row, Col, Divider } from 'antd'
import { formatMB, formatGB } from 'utils'

interface Props {}

const QuotaSet: React.FC<Props> = () => {
  const _isMounted = useRef(true)
  const [loading, setLoading] = useState(true)
  const [quotaSet, setQuotaSet] = useState<QuotaSetResponse>()

  useEffect(() => {
    fetchDatas()
    return () => {
      _isMounted.current = false
    }
  }, [])

  const fetchDatas = async () => {
    setLoading(true)
    const response = (await getQuotaSet({})) as QuotaSetResponse
    if (_isMounted.current) {
      setQuotaSet(response)
      setLoading(false)
    }
  }

  return (
    <PageLayout className="p_t_0 h-fill" title={<FormattedMessage id="dashboard.resource_quota" />} loading={loading}>
      {quotaSet && quotaSet.compute && quotaSet.storage && (
        <Row>
          <Col span={24}>
            <Divider>
              <FormattedMessage id="instance" />
            </Divider>
            <Row gutter={32}>
              <LineProgress
                name="instances"
                used={quotaSet.compute.instances.in_use}
                limit={quotaSet.compute.instances.limit}
              />
              <LineProgress
                name="cpu"
                prefix="vCPU"
                used={quotaSet.compute.cores.in_use}
                limit={quotaSet.compute.cores.limit}
              />
              <LineProgress
                name="ram"
                format={formatMB}
                used={quotaSet.compute.ram.in_use}
                limit={quotaSet.compute.ram.limit}
              />
              <LineProgress
                name="keypair"
                used={quotaSet.compute.key_pairs.in_use}
                limit={quotaSet.compute.key_pairs.limit}
              />
            </Row>
          </Col>
          <Col span={24}>
            <Divider>
              <FormattedMessage id="storage" />
            </Divider>
            <Row gutter={32}>
              <LineProgress
                name="volume"
                used={quotaSet.storage.volumes.in_use}
                limit={quotaSet.storage.volumes.limit}
              />
              <LineProgress
                name="volume_size"
                format={formatGB}
                used={quotaSet.storage.gigabytes.in_use}
                limit={quotaSet.storage.gigabytes.limit}
              />
            </Row>
          </Col>
          <Col span={24}>
            <Divider>
              <FormattedMessage id="network" />
            </Divider>
            <Row gutter={32}>
              <LineProgress
                name="dashboard.cloud_firewall"
                used={quotaSet.compute.security_groups.in_use}
                limit={quotaSet.compute.security_groups.limit < 0 ? 99 : quotaSet.compute.security_groups.limit}
              />
            </Row>
          </Col>
        </Row>
      )}
    </PageLayout>
  )
}

export default QuotaSet
