/* eslint-disable react/no-array-index-key */
import React from 'react'
import styles from './styles.module.scss'

interface MonitorNumberCardProps {
  title?: string
  numbers: number[]
  format?: Function
}

const MonitorNumber: React.FC<MonitorNumberCardProps> = ({ title, numbers, format }) => (
  <div>
    <div className={styles.numberContainer}>
      {numbers.map((number, index) => (
        <span key={index + number} className={styles.span}>
          {format ? format(number) : number}
        </span>
      ))}
    </div>
    {title && <div className={styles.title}>{title}</div>}
  </div>
)

export default MonitorNumber
