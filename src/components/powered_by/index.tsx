import React from 'react'

interface Props {
  color?: string
}

const PoweredBy: React.FC<Props> = ({ color = 'white' }) => {
  return (
    <h4 style={{ color }}>
      &copy; Powered by{' '}
      <strong>
        <a style={{ color: '#d02220' }} target="_blank" rel="noopener noreferrer" href="http://www.fibo.cloud">
          FIBO Cloud
        </a>
      </strong>
    </h4>
  )
}

export default PoweredBy
