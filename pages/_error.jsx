import React from 'react'

const statusCodes = {
    400: 'Bad Request',
    404: "We searched the three worlds and couldn't find your page",
    500: 'Internal Server Error',
    501: 'Not Implemented'
}

import '../styles/error.scss'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render() {
    return (
        <div className="ids-error">
            <div className="status-code">
                {this.props.statusCode}
            </div>
            <div className="status-description">{statusCodes[this.props.statusCode]}</div>
        </div>
    )
  }
}

export default Error