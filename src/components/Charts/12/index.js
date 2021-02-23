import React from 'react'
import { Progress } from 'antd'

const Chart12 = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="pr-3">
          <h2 className="font-size-18 font-weight-bold mb-1 text-dark">Гарж болох дүн</h2>
          <p className="font-size-15 mb-3">Таамаглал</p>
        </div>
        <div className="text-primary font-weight-bold font-size-24">$511.15</div>
      </div>
      <div className= 'mb-3'>
        <Progress
          type= 'line'
          percent= {78}
          showInfo= {false}
          strokeWidth= {12}
          strokeColor= '#007bff'
        />
      </div>
      <div className= 'd-flex text-gray-5 justify-content-between font-size-14'>
        <span className= 'text-uppercase'>Өсөлттэй</span>
        <span className= 'text-uppercase'>13%</span>
      </div>
    </div>
  )
}

export default Chart12
