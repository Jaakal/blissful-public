import React from 'react'

import '../../css/Request.css';

const Request401 = () => {
  return (
    <div className="request-container">
      <div className="error-code">401</div>
      <div className="error-message">Authorization required.</div>
    </div>
  )
}

export default Request401
