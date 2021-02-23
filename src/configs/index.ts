import { Settings } from '@ant-design/pro-layout'

export const CloseAwaitMS = 500

export const AvailableStatus = '#46be8a'
export const InUseStatus = '#108ee9'
export const ProcessStatus = '#0fabbc'
export const DownStatus = '#fb434a'

export const Confirm: string = 'confirm'

export const UsernameBlackList: string[] = [
  'root',
  'daemon',
  'bin',
  'sys',
  'sync',
  'games',
  'man',
  'lp',
  'mail',
  'news',
  'uucp',
  'proxy',
  'www-data',
  'backup',
  'list',
  'irc',
  'gnats',
  'nobody',
  'systemd-network',
  'systemd-resolve',
  'syslog',
  'messagebus',
  '_apt',
  'lxd',
  'uuidd',
  'dnsmasq',
  'landscape',
  'sshd',
  'pollinate',
  'ubuntu',
]

export default {
  navTheme: 'dark',
  layout: 'side',
  primaryColor: '#CE201F',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: false,
  },
  title: 'FIBOBILL',
  pwa: false,
  iconfontUrl: '',
} as Settings
