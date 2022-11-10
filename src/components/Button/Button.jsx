import React from 'react'
// import PropTypes from 'prop-types';

export default function Button({addMorePictures}) {
  return (
<button type="button" className='Button' onClick={addMorePictures}>Load more</button>  )
}

// Button.propType={addMorePictures:PropTypes.func.isRequired}