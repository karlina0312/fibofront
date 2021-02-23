import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

const PublicLayout: React.FC<RouteComponentProps<any>> = ({ children }) => <span>{children}</span>

export default withRouter(PublicLayout)
