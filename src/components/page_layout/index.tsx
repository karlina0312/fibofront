import { DownOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import cssClass from 'classnames'
import { MenuAction } from 'models'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from '../card'
import Loader from '../loader'
import styles from './styles.module.scss'

interface PageLayoutProps {
  noCard?: boolean
  title: React.ReactNode
  className?: string
  loading?: boolean
  actions?: Array<MenuAction>
  extraElement?: React.ReactNode
  createActionText?: string
  createAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  fetchAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  className,
  noCard = false,
  loading = false,
  createAction,
  fetchAction,
  extraElement,
  actions,
  children,
  createActionText = 'create',
  ...props
}) => {
  const actionMenu = (
    <Menu>
      {actions?.map((action, actionIndex) => (
        <Menu.Item
          key={`action${actionIndex}`}
          disabled={action.disabled}
          onClick={() => action.action && action.action()}
        >
          {action.icon} {action.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  const mainBody = () =>
    fetchAction ? (
      <>
        <div className={styles.header}>
          <Row>
            <Col className="m_b">
              <h1 className={cssClass(styles.title, styles.item)}>{title}</h1>
            </Col>
            <Col className="m_b">
              {createAction && (
                <Button type="primary" onClick={createAction} className={styles.item}>
                  <PlusOutlined />
                  <FormattedMessage id={createActionText} />
                </Button>
              )}
            </Col>
            <Col className="m_b">{extraElement && <span className={styles.item}>{extraElement}</span>}</Col>
            <Col className="m_b">
              {fetchAction && (
                <Button type="default" onClick={fetchAction} className={cssClass('onlyIcon', styles.item)}>
                  <SyncOutlined spin={loading} />
                </Button>
              )}
            </Col>
            <Col className="m_b">
              {actions && actions.length > 0 && (
                <Dropdown overlay={actionMenu} trigger={['click']}>
                  <Button type="default" className="onlyIcon">
                    <FormattedMessage id="actions" /> <DownOutlined />
                  </Button>
                </Dropdown>
              )}
            </Col>
          </Row>
        </div>
        {children}
      </>
    ) : (
      <Loader loading={loading}>
        <>
          <div className={styles.header}>
            <h1 className={cssClass(styles.title, styles.item)}>{title}</h1>
            {extraElement && <span className={styles.item}>{extraElement}</span>}
          </div>
          {children}
        </>
      </Loader>
    )

  return noCard ? (
    mainBody()
  ) : (
    <Card className={className} {...props}>
      {mainBody()}
    </Card>
  )
}

PageLayout.defaultProps = {
  actions: [],
}

export default PageLayout
