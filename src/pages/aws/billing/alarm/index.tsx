import { ColumnType } from 'antd/es/table'
import { listAwsBillingAlarm } from 'api'
import { Ligther, PageLayout, Table } from 'components'
import { AwsBillingAlarm, MenuAction } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { DateFormat, dateSort } from 'utils'
import CreateModal from './create'

interface AlarmProps {}

const AlarmList: React.FC<AlarmProps> = () => {
  const _isMounted = useRef(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [keyPairs, setAlarms] = useState<Array<AwsBillingAlarm>>([])
  const [, setSelectedRows] = useState<AwsBillingAlarm[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [createVisible, setCreateVisible] = useState<boolean>(false)

  useEffect(() => {
    fetchAlarms()
    return () => {
      _isMounted.current = false
    }
  }, [])

  const fetchAlarms = async () => {
    setLoading(true)
    const alarms = await listAwsBillingAlarm({})
    if (_isMounted.current) {
      if (alarms && alarms.MetricAlarms) {
        setAlarms(alarms.MetricAlarms as AwsBillingAlarm[])
      }
      setLoading(false)
    }
  }

  const columns: ColumnType<AwsBillingAlarm>[] = [
    {
      title: <FormattedMessage id="name" />,
      dataIndex: 'AlarmName',
      key: 'AlarmName',
      width: 300,
      ellipsis: true,
      sorter: (a, b) => a.AlarmName.localeCompare(b.AlarmName),
      render: (value: string) => <Ligther keywords={[keyword]} source={value} />,
    },
    {
      title: <FormattedMessage id="state" />,
      dataIndex: 'StateValue',
      key: 'StateValue',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.StateValue.localeCompare(b.StateValue),
      render: (value: string) => <Ligther keywords={[keyword]} source={value} />,
    },
    {
      title: <FormattedMessage id="billing.threshold" />,
      key: 'Threshold',
      dataIndex: 'Threshold',
      width: 200,
      ellipsis: true,
      sorter: (a, b) =>
        `${a.ComparisonOperator} ${a.Threshold}`.localeCompare(`${b.ComparisonOperator} ${b.Threshold}`),
      render: (_value, row) => <Ligther keywords={[keyword]} source={`${row.ComparisonOperator} ${row.Threshold}`} />,
    },
    {
      title: <FormattedMessage id="updated_at" />,
      key: 'AlarmConfigurationUpdatedTimestamp',
      dataIndex: 'AlarmConfigurationUpdatedTimestamp',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => dateSort(a.AlarmConfigurationUpdatedTimestamp, b.AlarmConfigurationUpdatedTimestamp),
      render: (value: Date) => <Ligther keywords={[keyword]} source={DateFormat(value)} />,
    },
    {
      title: <FormattedMessage id="actions" />,
      key: 'AlarmActions',
      dataIndex: 'AlarmActions',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => `${a.AlarmActions.length} action(s)`.localeCompare(`${b.AlarmActions.length} action(s)`),
      render: (value: string[]) => <Ligther keywords={[keyword]} source={`${value.length} action(s)`} />,
    },
  ]

  const actions: MenuAction[] = [
    // {
    //   name: <FormattedMessage id="delete" />,
    //   disabled: selectedRows.length === 0,
    //   icon: <DeleteOutlined />,
    //   action: () => {
    //     setDeleteVisible(true);
    //   },
    // },
  ]

  return (
    <PageLayout
      loading={loading}
      title={<FormattedMessage id="alarms" />}
      fetchAction={fetchAlarms}
      createAction={() => {
        setCreateVisible(true)
      }}
      actions={actions}
    >
      <>
        {createVisible && (
          <CreateModal
            visible={createVisible}
            onOk={() => {
              setCreateVisible(false)
              fetchAlarms()
            }}
            onCancel={() => {
              setCreateVisible(false)
            }}
          />
        )}
        {/* {deleteVisible && selectedRows.length > 0 && (
          <DeleteModal
            keyPairs={selectedRows}
            visible={deleteVisible}
            onOk={() => {
              setDeleteVisible(false);
              fetchKeypairs();
            }}
            onCancel={() => {
              setDeleteVisible(false);
            }}
          />
        )}
        {!!detailVisible && (
          <DetailModal
            keyPair={detailVisible}
            visible={!!detailVisible}
            onOk={() => {
              setDetailVisible(undefined);
            }}
          />
        )} */}
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          onRowSelected={setSelectedRows}
          dataCount={keyPairs.length}
          dataSource={keyword ? keyPairs : keyPairs}
          onSearch={(value) => {
            setKeyword(value)
          }}
        />
      </>
    </PageLayout>
  )
}

export default AlarmList
