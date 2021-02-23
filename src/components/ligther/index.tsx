import React from 'react'
import Highlighter from 'react-highlight-words'

interface LigtherProps {
  keywords: string[]
  source: string
}

const Ligther = ({ keywords, source }: LigtherProps) => {
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={keywords}
      autoEscape
      textToHighlight={source}
    />
  )
}

export default Ligther
