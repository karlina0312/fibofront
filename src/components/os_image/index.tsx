import { ReactComponent as CentOS } from 'assets/os/centos.svg'
import { ReactComponent as FedoraOS } from 'assets/os/fedora.svg'
import { ReactComponent as DefaultOS } from 'assets/os/os.svg'
import { ReactComponent as Ubuntu } from 'assets/os/ubuntu.svg'
import { ReactComponent as Windows } from 'assets/os/windows.svg'
import { ReactComponent as Debian } from 'assets/os/debian.svg'
import React from 'react'

interface OSImageProps {
  name: string
  size?: number
}

const OSImage = ({ name, size = 50 }: OSImageProps) => {
  if (name.toLowerCase().indexOf('windows') >= 0) return <Windows width={size} height={size} />
  if (name.toLowerCase().indexOf('ubuntu') >= 0) return <Ubuntu width={size} height={size} />
  if (name.toLowerCase().indexOf('centos') >= 0) return <CentOS width={size} height={size} />
  if (name.toLowerCase().indexOf('fedora') >= 0) return <FedoraOS width={size} height={size} />
  if (name.toLowerCase().indexOf('debian') >= 0) return <Debian width={size} height={size} />
  return <DefaultOS width={size} height={size} />
}

export default OSImage
