import React from 'react'

import '../../css/Request.css';

const Request400 = () => {
  return (
    <div className="request-container">
      <div className="error-code">400</div>
      <div className="error-message">You've sent a bad request.</div>
    </div>
  )
}

export default Request400
