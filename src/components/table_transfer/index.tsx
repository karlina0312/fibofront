import { Row, Table, Transfer } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { TransferProps } from 'antd/lib/transfer'
import React from 'react'

interface Props extends TransferProps<any> {
  leftColumns: ColumnsType<any>
  rightColumns: ColumnsType<any>
  addComponent?: React.ReactNode
}

const TableTransfer: React.FC<Props> = ({ leftColumns, rightColumns, addComponent, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns

      const rowSelection = {
        getCheckboxProps: (item: any) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected: boolean, selectedRows: any[]) {
          const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key)
          const diffKeys = selected
            ? treeSelectedKeys.filter((tree) => !listSelectedKeys.find((list) => list === tree))
            : listSelectedKeys.filter((list) => !treeSelectedKeys.find((tree) => tree === list))
          onItemSelectAll(diffKeys, selected)
        },
        onSelect({ key }: { key: string }, selected: boolean) {
          onItemSelect(key, selected)
        },
        selectedRowKeys: listSelectedKeys,
      }

      return (
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={filteredItems}
          size="small"
          footer={() => direction === 'right' && <Row justify="end">{addComponent}</Row>}
          style={listDisabled ? { pointerEvents: 'none' } : {}}
          onRow={({ key, disabled }: any) => ({
            onClick: () => {
              if (disabled || listDisabled) return
              onItemSelect(key, !listSelectedKeys.includes(key))
            },
          })}
        />
      )
    }}
  </Transfer>
)

export default TableTransfer
