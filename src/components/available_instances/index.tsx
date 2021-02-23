import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { TransferItem } from 'antd/lib/transfer'
import { listInstance } from 'api'
import { Instance, InstanceAddresses } from 'models'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import FetchingLoader from '../loader'
import TableTransfer from '../table_transfer'

let counter: number = 0

interface Props {
  value?: any[]
  onChange?: (data: any[]) => null
}

interface PoolMember {
  id: string
  name: string
  port: number
  weight: number
  ip: string
}

const AvailableInstances: React.FC<Props> = React.forwardRef<HTMLSpanElement, Props>(
  ({ value = [], onChange }, ref) => {
    const [data, setData] = useState<PoolMember[]>(value)
    const [loading, setLoading] = useState<boolean>(true)
    const [instances, setInstances] = useState<any[]>([])
    const [choosedInstance, setChoosedInstance] = useState<string[]>([])

    useEffect(() => {
      if (onChange) {
        onChange(data)
      }
    }, [data, onChange])

    useEffect(() => {
      fetchInstances()
    }, [])

    const fetchInstances = async () => {
      setLoading(true)
      const is = (await listInstance({})) as Instance[]
      setInstances(is)
      setLoading(false)
    }

    const onhandleChange = (event: string[]) => {
      setChoosedInstance(event)
      setData((oldData) => {
        const result: PoolMember[] = []
        event.map((ev) => {
          const inst: Instance = instances.find((i: Instance) => i.id === ev)
          const cache = oldData.find((o) => o.id === ev)
          if (cache) {
            result.push(cache)
          } else if (inst.id === ev) {
            let tmpIp: string = ''
            Object.keys(inst.addresses).map((key) => {
              return inst.addresses[key].map((padd) => {
                tmpIp = padd.addr
                return null
              })
            })
            const tempData: PoolMember = {
              id: ev,
              name: inst.name,
              port: 80,
              weight: 1,
              ip: tmpIp,
            }
            result.push(tempData)
          }
          return null
        })
        return result
      })
    }

    const onhandleRemove = (id: string) => {
      if (id.match(/(custom_)/g)) {
        setInstances((old) => old.filter((item) => item.id !== id))
      }
      setChoosedInstance((old) => old.filter((item) => item !== id))
      setData((old) => old.filter((item) => item.id !== id))
    }

    const leftColumns: ColumnType<Instance>[] = [
      {
        title: <FormattedMessage id="name" />,
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: <FormattedMessage id="ip" />,
        dataIndex: 'addresses',
        key: 'addresses',
        render: (addre: InstanceAddresses) => {
          return Object.keys(addre).map((key) => {
            return addre[key].map((padd) => {
              return <span key={padd.addr}>{padd.addr}</span>
            })
          })
        },
      },
    ]

    const rightColumns: ColumnType<Instance>[] = [
      {
        title: <FormattedMessage id="name" />,
        key: 'name',
        dataIndex: 'name',
        render: (val: string, record, index) => {
          if (record.id.match(/(custom_)/g)) {
            return (
              <Input
                defaultValue={data[index].name}
                onChange={(event) => {
                  setData((oldData) => {
                    oldData[index].name = event.target.value
                    return oldData
                  })
                }}
              />
            )
          }
          return val
        },
      },
      {
        title: <FormattedMessage id="ip" />,
        dataIndex: 'addresses',
        key: 'addresses',
        render: (addre: InstanceAddresses, record, index) => {
          if (record.id.match(/(custom_)/g)) {
            return (
              <Input
                defaultValue={data[index].ip}
                onChange={(event) => {
                  setData((oldData) => {
                    oldData[index].ip = event.target.value
                    return oldData
                  })
                }}
              />
            )
          }
          return Object.keys(addre).map((key) => {
            return addre[key].map((padd) => {
              return <span key={padd.addr}>{padd.addr}</span>
            })
          })
        },
      },
      {
        title: <FormattedMessage id="load_balancer.port" />,
        width: 80,
        render: (_value, _record, index) => (
          <InputNumber
            defaultValue={data[index].port}
            onChange={(event) => {
              setData((oldData) => {
                oldData[index].port = event as number
                return oldData
              })
            }}
          />
        ),
      },
      {
        title: <FormattedMessage id="weight" />,
        width: 50,
        render: (_value, _record, index) => (
          <InputNumber
            defaultValue={data[index].weight}
            onChange={(event) => {
              setData((oldData) => {
                oldData[index].weight = event as number
                return oldData
              })
            }}
          />
        ),
      },
      {
        title: <FormattedMessage id="action" />,
        key: 'action',
        render: (_text, record) => (
          <Button danger size="small" onClick={() => onhandleRemove(record.id)}>
            <DeleteOutlined />
          </Button>
        ),
      },
    ]

    return (
      <span ref={ref}>
        <FetchingLoader loading={loading}>
          <TableTransfer
            oneWay
            showSearch
            addComponent={
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  const tmpID = `custom_${counter}`
                  setInstances((old) => {
                    old.push({
                      id: tmpID,
                      name: '',
                      addresses: '',
                      disabled: false,
                    })
                    return old
                  })
                  choosedInstance.push(tmpID)
                  onhandleChange(choosedInstance)
                  counter += 1
                }}
              >
                <FormattedMessage id="add" />
              </Button>
            }
            rowKey={(record: unknown) => {
              const tmpInstance = record as Instance
              return tmpInstance.id
            }}
            dataSource={instances as any}
            targetKeys={choosedInstance}
            onChange={onhandleChange}
            listStyle={({ direction }: { direction: 'left' | 'right' }) => {
              if (direction === 'left') {
                return { width: '35%', flex: 'unset' }
              }
              return { width: '60%', flex: 'unset' }
            }}
            filterOption={(inputValue: string, item: TransferItem) => {
              const tmpInstance = (item as unknown) as Instance
              let adderFind: boolean = false
              Object.keys(tmpInstance.addresses).map((key) => {
                adderFind = tmpInstance.addresses[key].findIndex((padd) => padd.addr.indexOf(inputValue) !== -1) !== -1
                return adderFind
              })
              return item.name.indexOf(inputValue) !== -1 || adderFind
            }}
            leftColumns={leftColumns}
            rightColumns={rightColumns}
          />
        </FetchingLoader>
      </span>
    )
  }
)

export default AvailableInstances
