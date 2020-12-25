import React from 'react'

import '../../css/MassageLink.css'

const MassageLink = ({ massage: {name, short_description} }) => {
  return (
    <div className="massage-link-inner-wrapper">
      <div className={`massage-link-image ${name.toLowerCase().replace(/ /g, '-')}-image`}></div>
      <h1>{name}</h1>
      <div className="massage-short-description" lang="en">{short_description}</div>
    </div>
  )
}

export default MassageLink
