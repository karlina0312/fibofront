import Icon from '@ant-design/icons'
import { Col, Row, Select, Spin } from 'antd'
import { forecastAwsBilling, getCostAwsBilling } from 'api'
import { ReactComponent as CurrentIcon } from 'assets/icons/current.svg'
import { ReactComponent as ForecastIcon } from 'assets/icons/forecast.svg'
import { Card, DatePicker, PageLayout } from 'components'
import dayjs, { Dayjs } from 'dayjs'
import { AwsCostForecastResult, AwsCostResult } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { ResponsiveBar } from '@nivo/bar'
import { FormattedMessage } from 'react-intl'
import { DayJSFormatAWS, DayJsFormatOnlyDate, moneyFormat, moneyFormatDollar } from 'utils'
import Table from './table'
import {
  colors,
  granularityType,
  granularityValues,
  groupValues,
  metricsValues,
  metricType,
  serviceValues,
} from './statics'
import styles from './styles.module.scss'

interface Props {}

const today = dayjs()
const startOfMonth = dayjs().startOf('month')
const endOfMonth = dayjs().endOf('month')

const FormElement: React.FC<{ title: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginBottom: 12,
    }}
  >
    <strong>{title}:</strong>
    {children}
  </div>
)

const AwsBilling: React.FC<Props> = () => {
  const _isMounted = useRef(true)
  const [curLoading, setCurLoading] = useState(true)
  const [costloading, setCostLoading] = useState(true)
  const [rangeDate, setRangeDate] = useState<[Dayjs, Dayjs]>([startOfMonth, today])
  const [granularity, setGranularity] = useState<granularityType>('DAILY')
  const [metric, setMetric] = useState<metricType>('UNBLENDED_COST')
  const [group, setGroup] = useState<string>()
  const [services, setServices] = useState<string[]>([])
  const [costResult, setCostResult] = useState<AwsCostResult[]>([])
  const [totalCost, setTotalCost] = useState<AwsCostResult>()
  const [forecastResult, setForecastResult] = useState<AwsCostForecastResult>()

  const foundMetric = metricsValues.find((met) => met.value === metric)
  const loading = curLoading || costloading

  useEffect(() => {
    fetchCurrent()
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (foundMetric) {
      fetchCustomCost(rangeDate[0], rangeDate[1], granularity, foundMetric, services, group || '')
    }
  }, [rangeDate, granularity, foundMetric, services, group])

  const fetchCurrent = async () => {
    setCurLoading(true)
    const [cr, fr] = await Promise.all([
      getCostAwsBilling({
        data: {
          start_date: DayJsFormatOnlyDate(startOfMonth),
          end_date: DayJsFormatOnlyDate(today),
          granularity: 'MONTHLY',
          metric: ['UNBLENDED_COST'],
          services: [],
          group_name: '',
        },
      }),
      forecastAwsBilling({
        data: {
          start_date: DayJsFormatOnlyDate(today),
          end_date: DayJsFormatOnlyDate(endOfMonth.add(1, 'day')),
          granularity: 'DAILY',
          metric: 'UNBLENDED_COST',
        },
      }),
    ])
    if (_isMounted.current) {
      if (fr) {
        const tmp = fr as AwsCostForecastResult
        setForecastResult(tmp)
      }
      if (cr && cr.ResultsByTime && cr.ResultsByTime.length > 0) {
        const tmp = cr.ResultsByTime[0] as AwsCostResult
        setTotalCost(tmp)
      }
      setCurLoading(false)
    }
  }

  const fetchCustomCost = async (
    sd: Dayjs,
    ed: Dayjs,
    gr: string,
    mt: {
      title: string
      value: string
      key: string
    },
    sr: string[],
    gn: string
  ) => {
    setCostLoading(true)
    const cabs = await getCostAwsBilling({
      data: {
        start_date: DayJsFormatOnlyDate(sd),
        end_date: DayJsFormatOnlyDate(ed),
        granularity: gr,
        metric: [mt.value],
        services: sr,
        group_name: gn,
      },
    })
    if (_isMounted.current) {
      if (cabs && cabs.ResultsByTime && cabs.ResultsByTime.length > 0) {
        const tmp = cabs.ResultsByTime as AwsCostResult[]
        setCostResult(
          tmp.reduce<AwsCostResult[]>((acc, item) => {
            item.Groups = item.Groups.filter((val) => {
              return parseFloat(val.Metrics[mt.key]?.Amount || '0') > 0
            })
            acc.push(item)
            return acc
          }, [])
        )
      }
      setCostLoading(false)
    }
  }

  const tmpLastDay = endOfMonth.add(-1, 'day')

  if (
    foundMetric &&
    services.length === 0 &&
    forecastResult &&
    forecastResult.ForecastResultsByTime &&
    forecastResult.ForecastResultsByTime.length > 0 &&
    rangeDate[0].isBefore(tmpLastDay) &&
    rangeDate[1].isAfter(tmpLastDay)
  ) {
    forecastResult.ForecastResultsByTime.map((item) => {
      return costResult.findIndex((t) => {
        if (t.TimePeriod.Start === item.TimePeriod.Start) {
          t.Total[foundMetric.key].Amount = item.MeanValue
          t.IsForecast = true
          return true
        }
        return false
      })
    })
  }

  const chartLabel = costResult.reduce<string[]>(
    (acc, item) => [...acc, DayJSFormatAWS(dayjs(item.TimePeriod.Start))],
    []
  )

  const stacked = !!group

  const chartData = () => {
    if (foundMetric) {
      if (group) {
        return Array.from(
          costResult.reduce<Map<string, number>>((acc, item) => {
            item.Groups.map((grp) =>
              acc.set(
                grp.Keys[0],
                (acc.get(grp.Keys[0]) || 0) +
                  moneyFormat(
                    parseFloat(
                      item.Groups.find((r) => r.Keys.includes(grp.Keys[0]))?.Metrics[foundMetric.key]?.Amount || '0'
                    )
                  )
              )
            )
            return acc
          }, new Map())
        )
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .reduce<Chart.ChartDataSets[]>((acc, item, index, arr) => {
            const isOther = index === 5
            return [
              ...acc,
              {
                label: isOther ? 'Others' : item[0],
                stack: 'stack',
                backgroundColor: colors[index],
                borderColor: colors[index],
                borderWidth: 0.5,
                barPercentage: 0.6,
                hoverBackgroundColor: colors[index],
                hoverBorderColor: colors[index],
                data: isOther
                  ? costResult.reduce<number[]>(
                      (datas, res) => [
                        ...datas,
                        res.Groups.reduce<number>((gdatas, gres) => {
                          gdatas += moneyFormat(
                            parseFloat(
                              (arr.findIndex((ari) => ari[0] === gres.Keys[0]) < 0 &&
                                gres.Metrics[foundMetric.key]?.Amount) ||
                                '0'
                            )
                          )
                          return gdatas
                        }, 0),
                      ],
                      []
                    )
                  : costResult.reduce<number[]>(
                      (datas, res) => [
                        ...datas,
                        moneyFormat(
                          parseFloat(
                            res.Groups.find((r) => r.Keys.includes(item[0]))?.Metrics[foundMetric.key]?.Amount || '0'
                          )
                        ),
                      ],
                      []
                    ),
              },
            ]
          }, [])
      }
      return [
        {
          label: foundMetric.title,
          backgroundColor: costResult.reduce<string[]>(
            (datas, res) => [...datas, res.IsForecast ? '#fff' : colors[0]],
            []
          ),
          borderColor: colors[0],
          borderWidth: 0.5,
          barPercentage: 0.6,
          hoverBackgroundColor: costResult.reduce<string[]>(
            (datas, res) => [...datas, res.IsForecast ? '#fff' : colors[0]],
            []
          ),
          hoverBorderColor: colors[0],
          data: costResult.reduce<number[]>(
            (datas, res) => [
              ...datas,
              moneyFormat(parseFloat(res.Total[foundMetric.key] ? res.Total[foundMetric.key].Amount || '0' : '0')),
            ],
            []
          ),
        },
      ]
    }
    return undefined
  }

  return (
    <PageLayout
      loading={loading}
      fetchAction={(_e) => {
        if (foundMetric) {
          fetchCustomCost(rangeDate[0], rangeDate[1], granularity, foundMetric, services, group || '')
        }
      }}
      title={<FormattedMessage id="menu.billing" />}
    >
      {/* Current cost болон montly кост бар */}
      <Spin spinning={loading}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} xl={8} xxl={6}>
            <Card bodyStyle={{ padding: 5 }} style={{ backgroundColor: '#4b5d67', color: '#fff' }}>
              <div className={styles.totalCard}>
                <span className={styles.titleContainer}>
                  <Icon component={CurrentIcon} style={{ fontSize: 36, marginRight: 8 }} />
                  <span className={styles.title}>
                    <span className={styles.label}>
                      <FormattedMessage id="billing.current_cost" />
                    </span>
                    <span className={styles.subTitle}>
                      ({DayJSFormatAWS(startOfMonth)} - {DayJSFormatAWS(today)})
                    </span>
                  </span>
                </span>
                <span className={styles.amount}>
                  {moneyFormatDollar(parseFloat(totalCost?.Total['UnblendedCost']?.Amount || '0'))}
                </span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} xl={8} xxl={6}>
            <Card bodyStyle={{ padding: 5 }}>
              <div className={styles.totalCard}>
                <span className={styles.titleContainer}>
                  <Icon component={ForecastIcon} style={{ fontSize: 36, marginRight: 8 }} />
                  <span className={styles.title}>
                    <span className={styles.label}>
                      Түүх
                      {/* <FormattedMessage id="billing.forecast_cost" /> */}
                    </span>
                    <span className={styles.subTitle}>
                      ({DayJSFormatAWS(startOfMonth)} - {DayJSFormatAWS(endOfMonth)})
                    </span>
                  </span>
                </span>
                <span className={styles.amount}>
                  {moneyFormatDollar(
                    parseFloat(totalCost?.Total['UnblendedCost']?.Amount || '0') +
                      parseFloat(forecastResult?.Total?.Amount || '0')
                  )}
                </span>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xl={20} md={16} xs={24}>
            {/* graph bar хэсэг */}
            <Bar
              data={{
                labels: chartLabel,
                datasets: chartData(),
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      stacked,
                      scaleLabel: {
                        display: true,
                        labelString: 'Cost ($)',
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
          <Col xl={4} md={8} xs={24} style={{ marginTop: 10 }}>
            {/* hajuu taliin bard selection hesgiin uildeluud */}
            <FormElement title={<FormattedMessage id="time_range" />}>
              <DatePicker.RangePicker
                className="w-fill"
                value={rangeDate}
                onChange={(value) => {
                  if (value && value[0] && value[1]) {
                    setRangeDate([value[0], value[1]])
                  }
                }}
              />
            </FormElement>
            <FormElement title={<FormattedMessage id="interval" />}>
              <Select
                className="w-fill"
                placeholder={<FormattedMessage id="interval" />}
                value={granularity}
                onChange={(val) => {
                  setGranularity(val)
                }}
              >
                {granularityValues.map((gra) => (
                  <Select.Option key={gra.value} value={gra.value}>
                    {gra.title}
                  </Select.Option>
                ))}
              </Select>
            </FormElement>
            <FormElement title={<FormattedMessage id="metric" />}>
              <Select
                className="w-fill"
                placeholder={<FormattedMessage id="metric" />}
                value={metric}
                onChange={(val) => {
                  setMetric(val)
                }}
              >
                {metricsValues.map((met) => (
                  <Select.Option key={met.value} value={met.value}>
                    {met.title}
                  </Select.Option>
                ))}
              </Select>
            </FormElement>
            <FormElement title={<FormattedMessage id="services" />}>
              <Select
                mode="multiple"
                className="w-fill"
                placeholder={<FormattedMessage id="services" />}
                value={services}
                onChange={(val) => {
                  setServices(val)
                }}
              >
                {serviceValues.map((ser) => (
                  <Select.Option key={ser} value={ser}>
                    {ser}
                  </Select.Option>
                ))}
              </Select>
            </FormElement>
            <FormElement title={<FormattedMessage id="group" />}>
              <Select
                allowClear
                className="w-fill"
                placeholder={<FormattedMessage id="group" />}
                value={group}
                onChange={(val) => {
                  setGroup(val)
                }}
              >
                {groupValues.map((gr) => (
                  <Select.Option key={gr.value} value={gr.value}>
                    {gr.title}
                  </Select.Option>
                ))}
              </Select>
            </FormElement>
          </Col>
        </Row>
        <Table loading={loading} group={group} data={costResult} foundMetric={foundMetric} />
      </Spin>
    </PageLayout>
  )
}

export default AwsBilling
