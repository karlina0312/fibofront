import { LockOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import cssClass from 'classnames'
import { ReduxInterface, UserInterface } from 'models'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/user/reducers'
import styles from './styles.module.scss'

interface ProfileMenuProps {}

const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const dispatch = useDispatch()

  const { email } = useSelector<ReduxInterface, UserInterface>((state: ReduxInterface) => state.UserReducer)

  const logout = () => {
    dispatch({
      type: Actions.LOGOUT,
    })
  }

  const avatar = email || 'AU'

  const menu = (
    <Menu selectable={false}>
      <Menu.Item className={styles.item}>
        <div className={styles.profile}>
          <Avatar shape="square" className={cssClass('noselect', styles.avatar)} size={40}>
            {avatar.toUpperCase()}
          </Avatar>
          <div className={styles.names}>
            {`${email} `} <br />
          </div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout} className={styles.item}>
        <LockOutlined /> <FormattedMessage id="password_change" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout} className={styles.item}>
        <LockOutlined /> <FormattedMessage id="signout" />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className={cssClass(styles.profile, 'm_l_1')}>
        <Avatar shape="square" className={cssClass('noselect', styles.avatar)} size={40}>
          {avatar.toUpperCase()}
        </Avatar>
      </div>
    </Dropdown>
  )
}

export default ProfileMenu
