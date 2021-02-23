import { Col, Row, Table, Input } from 'antd'
import { TableProps } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

interface TableComponentProps extends TableProps<any> {
  onRowSelected?: Function
  onSearch?: (value: string) => void
  dataCount?: number
  searchComponent?: (onSearch: (value: string) => void) => React.ReactNode
}

const TableComponent: React.FC<TableComponentProps> = ({
  dataSource,
  onRowSelected,
  loading,
  onSearch,
  title,
  searchComponent,
  scroll = { x: 'max-content' },
  pagination = { showSizeChanger: true, pageSize: 20 },
  dataCount = dataSource?.length,
  ...props
}) => {
  const intl = useIntl()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (onRowSelected) {
      onRowSelected([])
    }
    setSelectedRowKeys([])
  }, [loading, onRowSelected])

  const rowSelection: TableRowSelection<any> = {
    fixed: true,
    selectedRowKeys,
    onChange: (selectRowKeys, selectedRows) => {
      if (onRowSelected) {
        onRowSelected(selectedRows)
      }
      setSelectedRowKeys(selectRowKeys)
    },
  }

  return (
    <Table
      size="small"
      rowSelection={onRowSelected && rowSelection}
      loading={loading}
      pagination={pagination}
      title={() => (
        <>
          {title && title([])}
          <Row justify="space-between" align="middle">
            <Col>
              {intl.formatMessage({ id: 'displaying' })} <strong>{dataCount}</strong>{' '}
              {intl.formatMessage({ id: 'rows' })}
            </Col>
            <Col>
              {onSearch &&
                ((searchComponent && searchComponent(onSearch)) || (
                  <Input.Search
                    enterButton
                    size="middle"
                    placeholder={intl.formatMessage({ id: 'search' })}
                    onChange={(e) => {
                      onSearch(e.target.value)
                    }}
                  />
                ))}
            </Col>
          </Row>
        </>
      )}
      scroll={scroll}
      dataSource={dataSource}
      {...props}
    />
  )
}

export default TableComponent
