import React from 'react'
import { render } from '@testing-library/react'
// import App from "../pages/dashboard/App";

test('renders learn react link', () => {
  const { getByText } = render(<span />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
