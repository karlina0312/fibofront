import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip, Row, Col } from 'antd'
import { ColumnType } from 'antd/es/table'
import { listAwsCredential } from 'api'
import { PageLayout, Table, Ligther } from 'components'
import { AwsCredential } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { findInString, DateFormat, dateSort } from 'utils'
import CreateModal from './create'
import DeleteModal from './delete'

interface CredentialProps {}

const CredentialList: React.FC<CredentialProps> = () => {
  const intl = useIntl()
  const _isMounted = useRef(true)
  const [loading, setLoading] = useState(true)
  const [credentials, setCredentials] = useState<AwsCredential[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [createVisible, setCreateVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<AwsCredential>()

  useEffect(() => {
    fetchCredentials()
    return () => {
      _isMounted.current = false
    }
  }, [])

  const fetchCredentials = async () => {
    setLoading(true)
    const pers = (await listAwsCredential({})) as AwsCredential[]
    if (_isMounted.current) {
      setCredentials(pers)
      setLoading(false)
    }
  }

  const columns: ColumnType<AwsCredential>[] = [
    {
      title: intl.formatMessage({ id: 'description' }),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      ellipsis: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (value: string) => <Ligther keywords={[keyword]} source={value} />,
    },
    {
      title: intl.formatMessage({ id: 'access_key' }),
      dataIndex: 'access_key',
      key: 'access_key',
      width: 300,
      ellipsis: true,
      sorter: (a, b) => a.access_key.localeCompare(b.access_key),
      render: (value: string) => <Ligther keywords={[keyword]} source={value} />,
    },
    {
      title: intl.formatMessage({ id: 'create_at' }),
      dataIndex: 'created_date',
      key: 'created_date',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => dateSort(a.created_date, b.created_date),
      render: (value: Date) => {
        const tmpVal = DateFormat(value)
        return <Ligther keywords={[keyword]} source={tmpVal} />
      },
    },
    {
      title: intl.formatMessage({ id: 'action' }),
      key: 'action',
      width: 80,
      render: (_value, record) => (
        <Tooltip placement="topRight" title={intl.formatMessage({ id: 'delete' })}>
          <Button
            danger
            className="onlyIcon"
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteVisible(record)
            }}
          />
        </Tooltip>
      ),
    },
  ]

  return (
    <PageLayout
      loading={loading}
      title={intl.formatMessage({ id: 'menu.credentials' })}
      fetchAction={() => {
        fetchCredentials()
      }}
      createAction={() => {
        setCreateVisible(true)
      }}
    >
      <>
        {createVisible && (
          <CreateModal
            visible={createVisible}
            onOk={() => {
              setCreateVisible(false)
              fetchCredentials()
            }}
            onCancel={() => {
              setCreateVisible(false)
            }}
          />
        )}
        {!!deleteVisible && (
          <DeleteModal
            credential={deleteVisible}
            visible={!!deleteVisible}
            onOk={() => {
              setDeleteVisible(undefined)
              fetchCredentials()
            }}
            onCancel={() => {
              setDeleteVisible(undefined)
            }}
          />
        )}
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataCount={credentials.length}
          dataSource={
            keyword
              ? credentials.filter(
                  (credential) =>
                    findInString(credential.description, keyword) ||
                    findInString(credential.access_key, keyword) ||
                    findInString(DateFormat(credential.created_date), keyword)
                )
              : credentials
          }
          onSearch={(value) => {
            setKeyword(value)
          }}
        />
      </>
    </PageLayout>
  )
}

export default CredentialList
