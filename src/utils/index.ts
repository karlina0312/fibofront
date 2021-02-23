import day, { Dayjs } from 'dayjs'
import { FileInterface, PtmBaseResponse, PtmRangeVectors, PtmChartData } from 'models'

export const isEmptyString = (value?: string) => {
  return value && value !== ''
}

export const DateFormat = (value: Date) => {
  if (value === (('0001-01-01T00:00:00Z' as unknown) as Date)) return '-'
  return value ? day(value).format('YYYY-MM-DD HH:mm:ss') : ''
}

export const DayJsFormatOnlyDate = (value: Dayjs) => {
  return value ? value.format('YYYY-MM-DD') : ''
}

export const DateFormatOnlyDate = (value: Date) => {
  if (value === (('0001-01-01T00:00:00Z' as unknown) as Date)) return '-'
  return value ? day(value).format('YYYY-MM-DD') : ''
}

export const DateFormatAWS = (value: Date) => {
  if (value === (('0001-01-01T00:00:00Z' as unknown) as Date)) return '-'
  return value ? day(value).format('MM/DD') : ''
}

export const DayJSFormatAWS = (value: Dayjs) => {
  return value ? value.format('MM/DD') : ''
}

export const DateTimeFormatAWS = (value: Date) => {
  if (value === (('0001-01-01T00:00:00Z' as unknown) as Date)) return '-'
  return value ? day(value).format('MM/DD HH:mm') : ''
}

export const DateNowDiffMinute = (value: Date) => {
  if (value === (('0001-01-01T00:00:00Z' as unknown) as Date)) return '-'
  return value ? `${day().diff(day(value), 'minute')} minute` : ''
}

export const goDateFormat = (value: string) => {
  return value ? day(value, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss') : ''
}

export const calcModalWidth = (width: number) => {
  if (width >= 1400) return '50%'
  if (width >= 768) return '75%'
  return '100%'
}

export const mbToGb = (size: number) => {
  return size / 1024
}

export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64)
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)
  for (let i = 0; i < binaryLen; i += 1) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes
}

export const moneyFormat = (value: number) => {
  return Math.ceil(value * 10000) / 10000
}

export const formatToCurrency = (value: number) => {
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const fixedNumber = (value: number, fixed = 2) => {
  console.log(Number(value.toFixed(fixed)))
  return Number(value.toFixed(fixed))
}

export const FixedNubmer = (value: number, fixed?: number) => {
  const tmpFixed = fixed && fixed > 0 ? fixed * 10 : 1
  return Math.ceil(value * tmpFixed) / tmpFixed
}

export const moneyFormatDollar = (value: number) => {
  return `$ ${Math.ceil(value * 100) / 100}`
}

export const moneyFormatTugrug = (value: number) => {
  return `${formatToCurrency(Math.ceil(value * 100) / 100)}₮`
}

export const secondsToHms = (second: number) => {
  const h = Math.floor(second / 3600)
  const m = Math.floor((second % 3600) / 60)
  const s = Math.floor((second % 3600) % 60)
  const hDisplay = h > 0 ? `${h}h ` : ''
  const mDisplay = m > 0 ? `${m}m ` : ''
  const sDisplay = s > 0 ? `${s}s` : ''
  return hDisplay + mDisplay + sDisplay
}

export const findInString = (source: string, keyword: string) => {
  return source.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
}

export const booleanSort = (x: boolean, y: boolean) => {
  if (x === y) return 0
  if (x) return -1
  return 1
}

export const dateSort = (x: Date, y: Date) => {
  if (x > y) return -1
  if (x < y) return 1
  return 0
}

export const isFolder = (file: FileInterface) => {
  return file.contentType === '' && file.name.substr(file.name.length - 1, 1) === '/'
}

export const getContextType = (seleted: React.Key[], folder: boolean) => {
  if (folder) return 'folder_item'
  if (seleted.length > 1) return 'multi_files_item'
  return 'file_item'
}

export const formatByte = (value: number, decimals = 1) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (value === 0) return '0'
  const k: number = 1024
  const i = Math.floor(Math.log(value) / Math.log(k))
  const tmp = k ** i
  const dm = decimals < 0 ? 0 : decimals
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`
}

export const formatKB = (value: number, decimals = 1) => {
  const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (value === 0) return '0'
  const k: number = 1024
  const i = Math.floor(Math.log(value) / Math.log(k))
  const tmp = k ** i
  const dm = decimals < 0 ? 0 : decimals
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`
}

export const formatMB = (value: number, decimals = 1) => {
  const sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (value === 0) return '0'
  const k: number = 1024
  const i = Math.floor(Math.log(value) / Math.log(k))
  const tmp = k ** i
  const dm = decimals < 0 ? 0 : decimals
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`
}

export const formatGB = (value: number, decimals = 1) => {
  const sizes = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (value === 0) return '0'
  const k: number = 1024
  const i = Math.floor(Math.log(value) / Math.log(k))
  const tmp = k ** i
  const dm = decimals < 0 ? 0 : decimals
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`
}

export const fileToText = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target) resolve(event.target.result)
    }
    reader.readAsText(file)
  })

export const pmtDataToChartData = async (res: PtmBaseResponse<PtmRangeVectors>) => {
  const tmp = []
  if (res.data && res.data.result) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const dataset of res.data.result) {
      const item: PtmChartData = {
        id: dataset.metric.instance,
        color: 'hsl(214, 70%, 50%)',
        data: dataset.values.map((value) => ({
          x: day(new Date(value[0] * 1000)).format('YYYY-MM-DD HH:mm:ss'),
          y: Math.round(Number(value[1]) * 100) / 100,
        })),
      }
      tmp.push(item)
    }
  }

  return tmp
}

export const formatSizeFromKbps = (bytes: number) => {
  const sizes = ['Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps']
  if (bytes === 0) return '0 Byte'
  // eslint-disable-next-line radix
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`)
  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`
}

export const formatSizeFromKb = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  if (bytes === 0) return '0 Byte'
  // eslint-disable-next-line radix
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`)
  return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`
}

export const formatSecondToMax = (seconds: number) => {
  if (seconds < 0) return `0 sec`
  if (seconds >= 0 && seconds < 60) return `${seconds} sec`
  if (seconds >= 60 && seconds < 3600) return `${(seconds / 60).toFixed(1)} min`
  if (seconds >= 3600 && seconds < 86400) return `${(seconds / 3600).toFixed(1)} hour`
  if (seconds >= 86400 && seconds < 604800) return `${(seconds / 86400).toFixed(1)} day`
  if (seconds >= 604800) return `${(seconds / 604800).toFixed(1)} week`
  return `${seconds} sec`
}

export const getHostnames = (val: string, hostnames: { name: string; value: string }[]) => {
  const fhn = hostnames.find((hn) => hn.name === val)
  if (fhn) {
    return fhn.value
  }
  return val
}
