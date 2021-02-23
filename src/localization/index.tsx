import { ConfigProvider } from 'antd'
// import antdEN from 'antd/lib/locale-provider/en_US'
import antdMN from 'antd/lib/locale-provider/mn_MN'
import { Empty } from 'components'
import { ReduxInterface, SettingsInterface } from 'models'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
// import english from './locales/en-US'
import mongolia from './locales/mn-MN'

const locales = {
  'mn-MN': mongolia,
  // 'en-US': english,
}

const antdData = {
  'mn-MN': antdMN,
  // 'en-US': antdEN,
}

interface LocalizationProps {
  children: React.ReactNode
}

const Localization: React.FC<LocalizationProps> = ({ children }) => {
  const { locale } = useSelector<ReduxInterface, SettingsInterface>((state: ReduxInterface) => state.SettingsReducer)

  dayjs.locale(locale.substring(0, 2))

  return (
    <ConfigProvider locale={antdData[locale]} renderEmpty={() => <Empty />}>
      <IntlProvider locale={locale.substring(0, 2)} messages={locales[locale]}>
        {children}
      </IntlProvider>
    </ConfigProvider>
  )
}

export default Localization
