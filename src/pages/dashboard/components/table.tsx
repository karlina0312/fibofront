import { Table } from 'antd'
import { AnyInterface, AwsCostResult } from 'models'
import React from 'react'
import { useIntl } from 'react-intl'
import { moneyFormatDollar } from 'utils'

interface Props {
  loading: boolean
  data: AwsCostResult[]
  group?: string
  foundMetric:
    | {
        title: string
        value: string
        key: string
      }
    | undefined
}

const TableComponent: React.FC<Props> = ({ loading, group, data, foundMetric }) => {
  const intl = useIntl()

  const column = [
    {
      width: 30,
      title: '№',
      dataIndex: 'id',
    },
    {
      width: 300,
      title: intl.formatMessage({ id: 'service' }),
      dataIndex: 'name',
      key: 'name',
    },
  ]

  data.map((cost) =>
    column.push({
      width: 80,
      title: cost.TimePeriod.Start.substring(5),
      key: cost.TimePeriod.Start,
      dataIndex: cost.TimePeriod.Start,
    })
  )

  const dataSource = () => {
    if (foundMetric) {
      if (group) {
        return Array.from(
          data.reduce<Set<string>>((acc, item) => {
            item.Groups.map((grp) => acc.add(grp.Keys[0]))
            return acc
          }, new Set())
        ).reduce<AnyInterface[]>(
          (acc, item, ind) => [
            ...acc,
            {
              id: ind + 1,
              name: item,
              ...data.reduce<AnyInterface>((datas, res) => {
                return {
                  ...datas,
                  [res.TimePeriod.Start]: moneyFormatDollar(
                    parseFloat(res.Groups.find((r) => r.Keys.includes(item))?.Metrics[foundMetric.key]?.Amount || '0')
                  ),
                }
              }, {}),
            },
          ],
          []
        )
      }
      return [
        {
          id: 1,
          name: foundMetric?.title,
          ...data.reduce<AnyInterface>((datas, res) => {
            return {
              ...datas,
              [res.TimePeriod.Start]: moneyFormatDollar(
                parseFloat(res.Total[foundMetric.key] ? res.Total[foundMetric.key].Amount || '0' : '0')
              ),
            }
          }, {}),
        },
      ]
    }
    return []
  }

  return (
    <Table
      className="m_t_2"
      bordered
      size="middle"
      rowKey="id"
      pagination={false}
      loading={loading}
      columns={column}
      scroll={{ x: 'max-content' }}
      dataSource={dataSource()}
    />
  )
}

export default TableComponent
