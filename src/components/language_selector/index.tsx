import { Button } from 'antd'
import { ReactComponent as ENFlag } from 'assets/flags/en.svg'
import { ReactComponent as MNFlag } from 'assets/flags/mn.svg'
import { Locale, ReduxInterface, SettingsInterface } from 'models'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/settings/reducers'

const size = 24

const LanguageSelector = () => {
  const dispatch = useDispatch()
  const { locale } = useSelector<ReduxInterface, SettingsInterface>((state: ReduxInterface) => state.SettingsReducer)

  const changeLang = (loc: Locale) => {
    dispatch({
      type: Actions.CHANGE_SETTING,
      payload: {
        setting: 'locale',
        value: loc,
      },
    })
  }

  return locale === 'mn-MN' ? (
    <Button
      type="link"
      onClick={() => {
        changeLang('mn-MN')
      }}
    >
      <MNFlag width={size} height={size} />
    </Button>
  ) : (
    <Button
      type="link"
      onClick={() => {
        changeLang('mn-MN')
      }}
    >
      <MNFlag width={size} height={size} />
    </Button>
  )
}

export default LanguageSelector
